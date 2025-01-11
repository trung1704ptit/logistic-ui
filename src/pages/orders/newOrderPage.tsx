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
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useNavigate } from "react-router-dom";
import { District, provinceList } from "@/lib/provinces";

import { searchByLabel } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import dayjs from "dayjs";
import http from "@/lib/http";
import { IPrice } from "@/interfaces/price";
import { apiRoutes } from "@/routes/api";
import * as XLSX from "xlsx";
import { priceKeys, priceKeysBlackList } from "@/constants";
import { omit } from "lodash";
import BillTable from "./billTable";

const { TextArea } = Input;

const { Option } = Select;

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
  const [contractorId, setContractorId] = useState<string>();
  const [pricings, setPricings] = useState<IPrice[]>([]);
  const [pickupDistricts, setPickupDistricts] = useState<District[]>([]);
  const [deliveryDistricts, setDeliveryDistricts] = useState<District[]>([]);
  const [unitSelected, setUnitSelected] = useState("");
  const [isReview, setIsReview] = useState(false);
  const drivers = useSelector((state: RootState) => state.driver.drivers);
  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );
  const trucks = useSelector((state: RootState) => state.truck.trucks);
  const navigate = useNavigate();

  const handleContractorChange = (value: string) => {
    setContractorId(value);
    form.setFieldsValue({ driver: undefined, truck: undefined });
  };

  const handleSubmit = (values: any) => {
    console.log("Submitted values:", values);
    setIsReview(true);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleProvinceChange = (value: string, field: string) => {
    const selectedProvince = provinceList.find(
      (province) => province.Code === value
    );
    if (selectedProvince) {
      const districts = selectedProvince.District;
      if (field === "pickupProvince") {
        setPickupDistricts(districts);
      } else {
        setDeliveryDistricts(districts);
      }
      form.setFieldsValue({
        [field === "pickupProvince" ? "pickupDistrict" : "deliveryDistrict"]:
          undefined,
      });
    }
  };

  const fetchPricings = async () => {
    try {
      const response = await http.get(`/prices/${contractorId}`);
      if (response.status === 200) {
        setPricings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching pricings:", error);
    }
  };

  useEffect(() => {
    if (contractorId) {
      fetchPricings();
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
      fetchPricings();

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
          tripCount: 1,
        }}
      >
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Nhà thầu"
              name="contractor"
              rules={[{ required: true, message: "Hãy chọn nhà thầu!" }]}
            >
              <Select
                size="large"
                placeholder="Chọn nhà thầu"
                onChange={handleContractorChange}
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
            <Form.Item label="Ngày tạo" name="orderDate">
              <DatePicker
                size="large"
                className="w-full"
                format={"DD-MM-YYYY"}
                defaultValue={dayjs(new Date())}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Tên công ty"
              name="companyName"
              rules={[{ required: true, message: "Hãy nhập tên công ty!" }]}
            >
              <Input size="large" placeholder="Nhập tên công ty" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Lái xe"
              name="driver"
              rules={[{ required: true, message: "Hãy chọn lái xe!" }]}
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
              name="truck"
              rules={[{ required: true, message: "Hãy chọn xe tải!" }]}
            >
              <Select
                size="large"
                placeholder="Chọn xe tải"
                disabled={!contractorId}
              >
                {contractorId &&
                  trucks.map((truck) => (
                    <Option key={truck.id} value={truck.id}>
                      {truck.license_plate}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <div>
                  Chọn bảng giá{" "}
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
              name="prices"
              rules={[{ required: true, message: "Hãy chọn bảng giá!" }]}
            >
              <Select
                size="large"
                placeholder="Chọn Bảng Giá"
                disabled={!contractorId}
              >
                {pricings &&
                  pricings.map((price) => (
                    <Option key={price.id} value={price.id}>
                      {price.file_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Divider />

          <Col xs={24} sm={12}>
            <Form.Item
              label="Điểm đóng hàng"
              name="pickupProvince"
              rules={[{ required: true, message: "Hãy chọn tỉnh/thành phố!" }]}
            >
              <Select
                size="large"
                placeholder="Chọn tỉnh/thành phố"
                filterOption={searchByLabel}
                showSearch
                onChange={(value) =>
                  handleProvinceChange(value, "pickupProvince")
                }
              >
                {provinceList.map((province) => (
                  <Option key={province.Code} value={province.Code}>
                    {province.FullName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="pickupDistrict">
              <Select
                size="large"
                placeholder="Chọn quận/huyện"
                showSearch
                filterOption={searchByLabel}
              >
                {pickupDistricts.map((district) => (
                  <Option key={district.Code} value={district.Code}>
                    {district.FullName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Điểm trả hàng"
              name="deliveryProvince"
              rules={[{ required: true, message: "Hãy chọn tỉnh/thành phố!" }]}
            >
              <Select
                size="large"
                showSearch
                placeholder="Chọn tỉnh/thành phố"
                filterOption={searchByLabel}
                onChange={(value) =>
                  handleProvinceChange(value, "deliveryProvince")
                }
              >
                {provinceList.map((province) => (
                  <Option key={province.Code} value={province.Code}>
                    {province.FullName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="deliveryDistrict">
              <Select
                size="large"
                placeholder="Chọn quận/huyện"
                showSearch
                filterOption={searchByLabel}
              >
                {deliveryDistricts.map((district) => (
                  <Option key={district.Code} value={district.Code}>
                    {district.FullName}
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
                disabled={!contractorId}
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
              <Form.Item
                label="Số tấn"
                name="weight"
                rules={[{ required: true, message: "Hãy nhập số tấn!" }]}
              >
                <Input size="large" type="number" />
              </Form.Item>
            </Col>
          )}

          {unitSelected === "volumn" && (
            <Col xs={24} sm={12}>
              <Form.Item
                label="Số khối"
                name="volumn"
                rules={[{ required: true, message: "Hãy nhập số khối!" }]}
              >
                <Input size="large" type="number" />
              </Form.Item>
            </Col>
          )}

          <Col xs={24} sm={12}>
            <Form.Item
              label="Số lượng chuyến"
              name="tripCount"
              rules={[{ required: true, message: "Hãy nhập số lượng chuyến!" }]}
            >
              <Input size="large" type="number" placeholder="Ví dụ: 1" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Cước vận chuyển" name="pointFee">
              <Input
                size="large"
                type="number"
                placeholder="Nhập Cước vận chuyển"
               
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Số điểm" name="pointFee">
              <Input
                size="large"
                type="number"
                placeholder="Nhập số điểm"
               
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Phí điểm" name="pointFee">
              <Input size="large" type="number" placeholder="Nhập phí điểm"  />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Phí thu hồi" name="refund">
              <Input size="large" type="number"  />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Phí bốc xếp" name="refund">
              <Input size="large" type="number"   />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Tiền ăn" name="meal">
              <Input size="large" type="number" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Phí lưu ca" name="standbyFee">
              <Input size="large" type="number" placeholder="Nhập phí lưu ca"  />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Vé bãi" name="parkingFee">
              <Input size="large" type="number" placeholder="Nhập vé bãi" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item>
              <Form.List name="otherFees">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row key={key} gutter={[8, 8]}>
                        <Col md={8}>
                          <Form.Item
                            {...restField}
                            name={[name, "name"]}
                            className="mb-0"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập tên chi phí!",
                              },
                            ]}
                          >
                            <Input size="large" placeholder="Tên chi phí" />
                          </Form.Item>
                        </Col>
                        <Col md={8}>
                          <Form.Item
                            {...restField}
                            name={[name, "value"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập giá trị!",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              type="number"
                              placeholder="Số tiền"
                            />
                          </Form.Item>
                        </Col>
                        <Col md={2}>
                          <Button
                            type="link"
                            danger
                            onClick={() => remove(name)}
                          >
                            Xóa
                          </Button>
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        size="large"
                        style={{ marginTop: 16 }}
                      >
                        + Thêm chi phí khác
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item label="Ghi chú" name="note">
              <TextArea
                size="large"
                placeholder="Nhập ghi chú (nếu có)"
                rows={2}
              />
            </Form.Item>
          </Col>

          {isReview && <BillTable />}

          <Col xs={24}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<PlusOutlined />}
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
