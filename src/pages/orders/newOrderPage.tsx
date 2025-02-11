import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
  Divider,
  message,
  Upload,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useNavigate } from "react-router-dom";

import { findPrice, searchByLabel } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import dayjs from "dayjs";
import http from "@/lib/http";
import { IPrice, IPriceDetail } from "@/interfaces/price";
import { apiRoutes } from "@/routes/api";
import * as XLSX from "xlsx";
import { priceKeys, priceKeysBlackList } from "@/constants";
import { omit } from "lodash";
import { AiOutlineExport } from "react-icons/ai";
import OrderDetails from "./orderDetails";
import { ITruck } from "@/interfaces/truck";
import { IDriver } from "@/interfaces/driver";

const { TextArea } = Input;
const { Option } = Select;

interface ILocationLabels {
  allDeliveryProvinces: string[];
  allPickupProvinces: string[];
}

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
    {
      key: webRoutes.orders,
      title: <Link to={webRoutes.orders}>Đơn hàng</Link>,
    },
    {
      key: webRoutes.addNewOrder,
      title: <Link to={webRoutes.addNewOrder}>Thêm đơn hàng</Link>,
    },
  ],
};

const AddOrderForm: React.FC = () => {
  const [form] = Form.useForm();
  const [contractorId, setContractorId] = useState<string>("");
  const [clientId, setClientId] = useState<string>();
  const [pricesByContractor, setPricesByContractor] = useState<IPrice[]>([]);
  const [pricesByClient, setPricesByClient] = useState<IPrice[]>([]);

  const [pickupDistricts, setPickupDistricts] = useState<string[]>([]);
  const [deliveryDistricts, setDeliveryDistricts] = useState<string[]>([]);
  const [unitSelected, setUnitSelected] = useState("weight");
  const [isReview, setIsReview] = useState(false);
  const allDrivers = useSelector((state: RootState) => state.driver.drivers);
  const allClients = useSelector((state: RootState) => state.client.clients);
  const allTrucks = useSelector((state: RootState) => state.truck.trucks);
  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );
  const [trucks, setTrucks] = useState<ITruck[]>([]);
  const [drivers, setDrivers] = useState<IDriver[]>([]);

  const [selectedPriceTable, setSelectedPriceTable] = useState<IPrice>();
  const [locationLabels, setLocationLabels] = useState<ILocationLabels>({
    allDeliveryProvinces: [],
    allPickupProvinces: [],
  });
  const navigate = useNavigate();

  const handleSelectContractor = (value: string) => {
    setContractorId(value);
    form.setFieldsValue({ driver_id: undefined, truck_id: undefined });
  };

  const handleSelectClient = (clientId: string) => {
    setClientId(clientId);
    fetchPricings(clientId, "client");
  };

  const handleSubmit = (values: any) => {
    setIsReview(true);
  };

  const updateLocationLabels = (data: any) => {
    setSelectedPriceTable(data);
    const allPickupProvinces: string[] = data.price_details.map(
      (item: IPriceDetail) => item.from_city
    );
    const allDeliveryProvinces: string[] = data.price_details.map(
      (item: IPriceDetail) => item.to_city
    );

    setLocationLabels({
      allPickupProvinces: [...new Set(allPickupProvinces)],
      allDeliveryProvinces: [...new Set(allDeliveryProvinces)],
    });
  };

  const handleSelectPriceTable = async (priceId: string) => {
    try {
      const { data } = await http.get(
        `${apiRoutes.prices}/${contractorId}/${priceId}`
      );
      updateLocationLabels(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleProvinceChange = (value: string, field: string) => {
    if (field === "pickup_province") {
      const districts =
        selectedPriceTable?.price_details
          .filter((item) => item.from_city === value)
          .map((item) => item.from_district) || [];

      setPickupDistricts([...new Set(districts)]);
      form.setFieldValue("pickup_district", null);
    } else {
      const districts =
        selectedPriceTable?.price_details
          .filter((item) => item.to_city === value)
          .map((item) => item.to_district) || [];

      setDeliveryDistricts([...new Set(districts)]);
      form.setFieldValue("delivery_district", null);
    }
    form.setFieldValue("trip_salary", null);
  };

  const handleDistrictChange = () => {
    const truckId = form.getFieldValue("truck_id");
    const priceId = form.getFieldValue("price_id");
    const pickupProvince = form.getFieldValue("pickup_province");
    const pickupDistrict = form.getFieldValue("pickup_district");
    const deliveryProvince = form.getFieldValue("delivery_province");
    const deliveryDistrict = form.getFieldValue("delivery_district");
    if (
      truckId &&
      priceId &&
      pickupProvince &&
      pickupDistrict &&
      deliveryProvince &&
      deliveryDistrict
    ) {
      const selectedTruck = allTrucks.find(
        (item) => item.id === form.getFieldValue("truck_id")
      );
      const singlePriceRow = selectedPriceTable?.price_details.find(
        (item) =>
          item.from_city === pickupProvince &&
          item.from_district === pickupDistrict &&
          item.to_city === deliveryProvince &&
          item.to_district === deliveryDistrict
      );
      if (selectedTruck && singlePriceRow) {
        const tripSalary = findPrice(
          singlePriceRow.weight_prices,
          `${selectedTruck.capacity}T`
        );
        form.setFieldValue("trip_salary", tripSalary);
      }
    }
  };

  const fetchPricings = async (ownerId: string, ownerType: string) => {
    try {
      const res = await http.get(`/prices/${ownerId}?ownerType=${ownerType}`);
      if (res.status === 200) {
        if (ownerType === "contractor") {
          setPricesByContractor(res.data.data);
        } else {
          setPricesByClient(res.data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching pricings:", error);
    }
  };

  useEffect(() => {
    if (contractorId) {
      // filter prices
      fetchPricings(contractorId, "contractor");

      // filter trucks
      const trucksFiltered = allTrucks.filter(
        (item) => item.contractor_id === contractorId
      );
      setTrucks(trucksFiltered);

      // filter drivers
      const driversFiltered = allDrivers.filter(
        (item) => item.contractor_id === contractorId
      );
      setDrivers(driversFiltered);
    }
  }, [contractorId]);

  // Utility function to parse Excel file locally
  const parseExcelFile = (file: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        try {
          const ab = e.target.result;
          const wb = XLSX.read(ab, { type: "array" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(ws);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileUpload = async (file: any) => {
    try {
      const timestamp = new Date().getTime();
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
        .format(new Date())
        .replace(/\//g, "_"); // Replace "/" with "_" to get "DD_MM_YYYY"

      // Combine timestamp and formatted date in the filename
      const originalExtension = file.name.split(".").pop();
      const newFileName = `${timestamp}_${formattedDate}.${originalExtension}`;

      const renamedFile = new File([file], newFileName, { type: file.type });
      const jsonData = await parseExcelFile(renamedFile);

      // Step 1: Prepare the file for upload
      const formData = new FormData();
      formData.append("file", renamedFile);

      // Step 3: Upload the file
      try {
        await http.post(`${apiRoutes.files}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Required to indicate file upload
          },
        });
      } catch (error) {
        console.error("Error uploading file:", error);
        message.error("Có lỗi xảy ra trong quá trình tải file");
      }

      const prices = jsonData.map((item: any) => ({
        from_city: item[priceKeys.fromCity],
        from_district: item[priceKeys.fromDistrict],
        to_city: item[priceKeys.toCity],
        to_district: item[priceKeys.toDistrcit],
        weight_prices: {
          ...omit(item, priceKeysBlackList),
        },
        notes: item[priceKeys.notes],
      }));

      const data = {
        contractor_id: contractorId,
        file_name: newFileName,
        prices,
      };

      updateLocationLabels({ price_details: prices });

      // Step 4: Send parsed data to the API
      const pricesRes = await http.post(
        `${apiRoutes.prices}/${contractorId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json", // Ensure this header is set for JSON data
          },
        }
      );
      fetchPricings(contractorId, "contractor");

      message.success(`Đã tải lên bảng giá excel ${renamedFile.name}`);

      if (pricesRes?.data?.data) {
        form.setFieldsValue({ prices: pricesRes?.data?.data?.id });
        message.info(`Đang áp dụng bảng giá mới ${renamedFile.name}`);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra trong quá trình tải file");
    }
  };

  const handleUnitSelect = (value: string) => {
    setUnitSelected(value);
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 800, margin: "0 auto" }}
        initialValues={{
          trip_count: 1,
          trip_salary: 0,
          order_time: dayjs(new Date()),
          unit: "weight",
        }}
      >
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Nhà thầu"
              name="contractor_id"
              rules={[{ required: true, message: "Hãy chọn nhà thầu!" }]}
            >
              <Select
                size="large"
                placeholder="Chọn nhà thầu"
                onChange={handleSelectContractor}
              >
                {contractors.map((contractor) => (
                  <Option key={contractor.id} value={contractor.id}>
                    {contractor.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Ngày tạo" name="order_time">
              <DatePicker
                size="large"
                className="w-full"
                format={"DD-MM-YYYY"}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Chọn Lái xe"
              name="driver_id"
              // rules={[{ required: true, message: "Hãy chọn lái xe!" }]}
            >
              <Select
                size="large"
                placeholder="Chọn lái xe"
                disabled={!contractorId}
              >
                {contractorId &&
                  drivers.map((driver) => (
                    <Option key={driver.id} value={driver.id}>
                      {driver.full_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Chọn xe tải"
              name="truck_id"
              // rules={[{ required: true, message: "Hãy chọn xe tải!" }]}
            >
              <Select
                size="large"
                placeholder="Chọn xe tải"
                disabled={!contractorId}
              >
                {contractorId &&
                  trucks.map((truck) => (
                    <Option key={truck.id} value={truck.id}>
                      {truck.license_plate} - {truck.capacity}T / {truck.volume}
                      m³
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Nhãn hàng"
              name="client"
              rules={[{ required: true, message: "Hãy chọn nhãn hàng!" }]}
            >
              <Select
                size="large"
                placeholder="Chọn nhãn hàng"
                onChange={handleSelectClient}
              >
                {allClients.map((client) => (
                  <Option key={client.id} value={client.id}>
                    {client.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <div>
                  Bảng giá nhãn hàng{" "}
                  {contractorId && (
                    <Upload
                      name="avatar"
                      className="avatar-uploader cursor-pointer"
                      customRequest={({ file, onSuccess, onError }: any) => {
                        handleFileUpload(file)
                          .then(() => onSuccess?.(null, file)) // Indicate success to antd Upload
                          .catch((err) => onError?.(err)); // Handle errors
                      }}
                      showUploadList={false}
                      accept=".xlsx,.xls"
                    >
                      <Link to={""}>(Thêm bảng giá khác?)</Link>
                    </Upload>
                  )}
                </div>
              }
              name="price_id"
              rules={[{ required: true, message: "Hãy chọn bảng giá!" }]}
            >
              <Select
                size="large"
                placeholder="Chọn Bảng Giá"
                disabled={!contractorId}
                onChange={handleSelectPriceTable}
              >
                {pricesByClient &&
                  pricesByClient.map((priceTable, index) => (
                    <Option key={priceTable.id} value={priceTable.id}>
                      {priceTable.file_name} {index === 0 ? "(Mới nhất)" : ""}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <div>
                  Bảng giá cho nhà thầu{" "}
                  {contractorId && (
                    <Upload
                      name="avatar"
                      className="avatar-uploader cursor-pointer"
                      customRequest={({ file, onSuccess, onError }: any) => {
                        handleFileUpload(file)
                          .then(() => onSuccess?.(null, file)) // Indicate success to antd Upload
                          .catch((err) => onError?.(err)); // Handle errors
                      }}
                      showUploadList={false}
                      accept=".xlsx,.xls"
                    >
                      <Link to={""}>(Thêm bảng giá khác?)</Link>
                    </Upload>
                  )}
                </div>
              }
              name="price_id"
              rules={[{ required: true, message: "Hãy chọn bảng giá!" }]}
            >
              <Select
                size="large"
                placeholder="Chọn Bảng Giá"
                disabled={!contractorId}
                onChange={handleSelectPriceTable}
              >
                {pricesByContractor &&
                  pricesByContractor.map((priceTable, index) => (
                    <Option key={priceTable.id} value={priceTable.id}>
                      {priceTable.file_name} {index === 0 ? "(Mới nhất)" : ""}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Đơn vị tính"
              name="unit"
              rules={[{ required: true, message: "Hãy chọn Đơn vị tính!" }]}
            >
              <Select
                size="large"
                placeholder="Chọn đơn vị tính"
                onChange={handleUnitSelect}
              >
                <Option key="weight" value="weight">
                  Theo Tấn
                </Option>
                <Option key="volumn" value="volumn">
                  Theo Khối
                </Option>
              </Select>
            </Form.Item>
          </Col>

          {unitSelected === "weight" && (
            <Col xs={24} sm={12}>
              <Form.Item label="Số tấn của hàng" name="package_weight">
                <Input
                  size="large"
                  type="number"
                  min={0}
                  onWheel={(e) => e.currentTarget.blur()}
                  placeholder="Nhập số tấn"
                />
              </Form.Item>
            </Col>
          )}

          {unitSelected === "volumn" && (
            <Col xs={24} sm={12}>
              <Form.Item label="Số khối của hàng" name="package_volumn">
                <Input
                  size="large"
                  type="number"
                  min={0}
                  onWheel={(e) => e.currentTarget.blur()}
                  placeholder="Nhập số khối"
                />
              </Form.Item>
            </Col>
          )}

          <Divider />

          <Col xs={24} sm={12}>
            <Form.Item
              label="Điểm đóng hàng"
              name="pickup_province"
              rules={[{ required: true, message: "Hãy chọn tỉnh/thành phố!" }]}
            >
              <Select
                size="large"
                placeholder="Chọn tỉnh/thành phố"
                filterOption={searchByLabel}
                showSearch
                onChange={(value) =>
                  handleProvinceChange(value, "pickup_province")
                }
              >
                {locationLabels.allPickupProvinces.map((province) => (
                  <Option key={province} value={province}>
                    {province}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="pickup_district">
              <Select
                size="large"
                placeholder="Chọn quận/huyện"
                showSearch
                filterOption={searchByLabel}
                onChange={handleDistrictChange}
              >
                {pickupDistricts.map((district) => (
                  <Option key={district} value={district}>
                    {district}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Điểm trả hàng"
              name="delivery_province"
              rules={[{ required: true, message: "Hãy chọn tỉnh/thành phố!" }]}
            >
              <Select
                size="large"
                showSearch
                placeholder="Chọn tỉnh/thành phố"
                filterOption={searchByLabel}
                onChange={(value) =>
                  handleProvinceChange(value, "delivery_province")
                }
              >
                {locationLabels.allDeliveryProvinces.map((province) => (
                  <Option key={province} value={province}>
                    {province}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="delivery_district">
              <Select
                size="large"
                placeholder="Chọn quận/huyện"
                showSearch
                filterOption={searchByLabel}
                onChange={handleDistrictChange}
              >
                {deliveryDistricts.map((district) => (
                  <Option key={district} value={district}>
                    {district}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Lương chuyến"
              name="trip_salary"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                size="large"
                type="number"
                min={0}
                placeholder="Nhập lương chuyến"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Lương theo ngày"
              name="daily_salary"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                size="large"
                type="number"
                min={0}
                placeholder="Nhập Lương theo ngày"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Số điểm"
              name="point_count"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                size="large"
                type="number"
                min={0}
                placeholder="Nhập số điểm"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Lương điểm"
              name="point_salary"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                size="large"
                type="number"
                min={0}
                placeholder="Nhập lương điểm"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Phí thu hồi"
              name="recovery_fee"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                size="large"
                type="number"
                min={0}
                onWheel={(e) => e.currentTarget.blur()}
                placeholder="Nhập phí thu hồi"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Lương bốc xếp"
              name="loading_salary"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                size="large"
                type="number"
                min={0}
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Tiền ăn"
              name="meal_fee"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                size="large"
                type="number"
                min={0}
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Vé bãi"
              name="parking_fee"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                size="large"
                type="number"
                min={0}
                placeholder="Nhập vé bãi"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Tiền lưu ca"
              name="standby_fee"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                size="large"
                type="number"
                min={0}
                placeholder="Nhập phí lưu ca"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Chi khác"
              name="other_salary"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                size="large"
                type="number"
                min={0}
                placeholder="Nhập Chi khác"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Đổ dầu ngoài"
              name="outside_oil_fee"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                size="large"
                type="number"
                min={0}
                placeholder="Nhập phí đổ dầu ngoài"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Chi dầu"
              name="oil_fee"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                size="large"
                type="number"
                min={0}
                placeholder="Nhập chi dầu"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Thu cước"
              name="charge_fee"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                size="large"
                type="number"
                min={0}
                placeholder="Nhập thu cước"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item label="Ghi chú" name="notes">
              <TextArea
                size="large"
                placeholder="Nhập ghi chú (nếu có)"
                rows={2}
              />
            </Form.Item>
          </Col>

          {isReview && (
            <OrderDetails
              data={form.getFieldsValue()}
              isReadOnly={false}
              onClose={() => setIsReview(false)}
            />
          )}

          <Col xs={24}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<AiOutlineExport />}
                >
                  Tiếp theo
                </Button>
                <Button
                  type="default"
                  icon={<CloseOutlined />}
                  onClick={handleCancel}
                >
                  Thoát
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </BasePageContainer>
  );
};

export default AddOrderForm;
