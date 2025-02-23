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
import {
  CONTRACTOR_TYPES,
  DEFAULT_PRICE,
  OWNER_TYPES,
  priceKeys,
  priceKeysBlackList,
  UNIT_TYPES,
} from "@/constants";
import { omit } from "lodash";
import { AiOutlineExport } from "react-icons/ai";
import OrderDetails from "./orderDetails";
import { ITruck } from "@/interfaces/truck";
import { IDriver } from "@/interfaces/driver";
import { IContractor } from "@/interfaces/contractor";
import { IClient } from "@/interfaces/client";
import InputNumber from "@/components/InputNumber";
import SelectWithInput from "@/components/SelectWithInput";

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
  const [selectedContractor, setSelectedContractor] = useState<IContractor>();
  const [selectedClient, setSelectedClient] = useState<IClient>();
  const [selectedTruck, setSelectedTruck] = useState<ITruck>();

  const [priceListContractor, setPriceListContractor] = useState<IPrice[]>([]);
  const [priceListClient, setPriceListClient] = useState<IPrice[]>([]);

  const [pickupDistrictList, setPickupDistrictList] = useState<string[]>([]);
  const [deliveryDistrictList, setDeliveryDistrictList] = useState<string[]>(
    []
  );
  const [unitSelected, setUnitSelected] = useState("");
  const [isReview, setIsReview] = useState(false);
  const allDrivers = useSelector((state: RootState) => state.driver.drivers);
  const allClients = useSelector((state: RootState) => state.client.clients);
  const allTrucks = useSelector((state: RootState) => state.truck.trucks);
  const [highlightPriceFromClient, setHighlightPriceFromClient] =
    useState(false);
  const [highlightPriceForContractor, setHighlightPriceForContractor] =
    useState(false);

  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );
  const [trucks, setTrucks] = useState<ITruck[]>([]);
  const [drivers, setDrivers] = useState<IDriver[]>([]);

  const [selectedPriceClient, setSelectedPriceClient] = useState<IPrice>();
  const [selectedPriceContractor, setSelectedPriceContractor] =
    useState<IPrice>();

  const [locationLabels, setLocationLabels] = useState<ILocationLabels>({
    allDeliveryProvinces: [],
    allPickupProvinces: [],
  });
  const navigate = useNavigate();

  const packageWeight = Form.useWatch("package_weight", form);
  const truckCapacity = Form.useWatch("truck_capacity", form);
  const packageVolumn = Form.useWatch("package_volumn", form);
  const pickupProvince = Form.useWatch("pickup_province", form);
  const pickupDistrict = Form.useWatch("pickup_district", form);
  const deliveryProvince = Form.useWatch("delivery_province", form);
  const deliveryDistrict = Form.useWatch("delivery_district", form);

  const isInternal = selectedContractor?.type === CONTRACTOR_TYPES.internal;

  const handleSelectContractor = (value: string) => {
    const filterContractor = contractors.find((item) => item.id === value);
    setSelectedContractor(filterContractor);
    form.setFieldsValue({
      driver_id: undefined,
      truck_id: undefined,
      price_for_contractor: 0,
      trip_salary: 0,
      price_for_contractor_id: undefined,
      order_type: filterContractor?.type,
    });
  };

  const handleSelectClient = (clientId: string) => {
    const filterClient = allClients.find((item) => item.id === clientId);
    setSelectedClient(filterClient);
    form.setFieldsValue({
      price_from_client: undefined,
      price_from_client_id: undefined,
    });
    fetchPricings(clientId, "client");
  };

  const handleSubmit = () => {
    setIsReview(true);
  };

  const updateLocationLabels = (data: any) => {
    setSelectedPriceContractor(data);
    const allPickupProvinces: string[] = data.price_details.map(
      (item: IPriceDetail) => item.pickup_province
    );
    const allDeliveryProvinces: string[] = data.price_details.map(
      (item: IPriceDetail) => item.delivery_province
    );

    setLocationLabels({
      allPickupProvinces: [...new Set(allPickupProvinces)],
      allDeliveryProvinces: [...new Set(allDeliveryProvinces)],
    });
  };

  const handleSelectPriceContractor = async (priceId: string) => {
    try {
      const { data } = await http.get(
        `${apiRoutes.prices}/${selectedContractor?.id}/${priceId}`
      );
      updateLocationLabels(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectPriceClient = async (priceId: string) => {
    try {
      const { data } = await http.get(
        `${apiRoutes.prices}/${selectedClient?.id}/${priceId}`
      );
      setSelectedPriceClient(data.data);
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
        selectedPriceContractor?.price_details
          .filter((item) => item.pickup_province === value)
          .map((item) => item.pickup_district)
          .sort() || [];

      setPickupDistrictList([...new Set(districts)]);
      form.setFieldValue("pickup_district", null);
    } else {
      const districts =
        selectedPriceContractor?.price_details
          .filter((item) => item.delivery_province === value)
          .map((item) => item.delivery_district)
          .sort() || [];

      setDeliveryDistrictList([...new Set(districts)]);
      form.setFieldValue("delivery_district", null);
    }
  };

  const fetchPricings = async (ownerId: string, ownerType: string) => {
    try {
      const res = await http.get(`/prices/${ownerId}?ownerType=${ownerType}`);
      if (res.status === 200) {
        if (ownerType === OWNER_TYPES.contractor) {
          setPriceListContractor(res.data.data);
        } else {
          setPriceListClient(res.data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching pricings:", error);
    }
  };

  useEffect(() => {
    if (selectedContractor?.id) {
      // filter prices
      fetchPricings(selectedContractor?.id, "contractor");

      // filter trucks
      const trucksFiltered = allTrucks.filter(
        (item) => item.contractor_id === selectedContractor?.id
      );
      setTrucks(trucksFiltered);

      // filter drivers
      const driversFiltered = allDrivers.filter(
        (item) => item.contractor_id === selectedContractor?.id
      );
      setDrivers(driversFiltered);
    }
  }, [selectedContractor?.id]);

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

  const handleFileUpload = async (file: any, ownerType: string) => {
    try {
      let ownerId: string = selectedContractor?.id as string;
      const isClientType = ownerType === "client";
      if (isClientType && selectedClient) {
        ownerId = selectedClient.id;
      }

      const filterFileName = (
        isClientType ? priceListClient : priceListContractor
      ).filter((item) => item.file_name.includes(file.name));
      let filename = file.name;
      if (filterFileName.length > 0) {
        filename = `${filterFileName.length}-${file.name}`;
      }

      const renamedFile = new File([file], filename, { type: file.type });
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
        return;
      }

      const prices = jsonData
        .filter((item: any) => {
          return (
            item[priceKeys.pickupProvince] && item[priceKeys.deliveryProvince]
          );
        })
        .map((item: any) => ({
          pickup_province:
            item[priceKeys.pickupProvince]?.trim() || DEFAULT_PRICE,
          pickup_district:
            item[priceKeys.pickupDistrict]?.trim() || DEFAULT_PRICE,
          delivery_province:
            item[priceKeys.deliveryProvince]?.trim() || DEFAULT_PRICE,
          delivery_district:
            item[priceKeys.deliveryDistrict]?.trim() || DEFAULT_PRICE,
          weight_prices: {
            ...omit(item, priceKeysBlackList),
          },
          notes: item[priceKeys.notes],
        }));

      const data = {
        owner_id: ownerId,
        owner_type: ownerType,
        file_name: filename,
        prices,
      };

      updateLocationLabels({ price_details: prices });

      // Step 4: Send parsed data to the API
      const pricesRes = await http.post(
        `${apiRoutes.prices}/${ownerId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json", // Ensure this header is set for JSON data
          },
        }
      );

      message.success(`Đã tải lên bảng giá excel ${renamedFile.name}`);
      await fetchPricings(ownerId, ownerType);

      if (pricesRes?.data?.data) {
        if (isClientType) {
          form.setFieldsValue({ price_from_client_id: undefined });
        } else {
          form.setFieldsValue({ price_for_contractor_id: undefined });
        }
      }
    } catch (error) {
      message.error("Có lỗi xảy ra trong quá trình tải file");
      return;
    }
  };

  const handleUnitSelect = (value: string) => {
    setUnitSelected(value);

    if (value === UNIT_TYPES.trip) {
      if (!form.getFieldValue("truck_id")) {
        message.info("Vui lòng chọn xe tải!");
        return;
      } else {
        // if user selected a truck
        console.log('selectedTruck:', selectedTruck)
        form.setFieldValue("truck_capacity", selectedTruck?.capacity);
      }
    } else {
      form.setFieldValue("package_volumn", undefined);
      form.setFieldValue("package_weight", undefined);
      form.setFieldValue("truck_capacity", undefined);
    }
  };

  // watch changes, update the price_from_client
  useEffect(() => {
    // change the client selected selected
    // change the pickup_province, pickup_district, delivery_province, delivery_district
    if (
      selectedPriceClient &&
      (packageWeight || packageVolumn || truckCapacity) &&
      pickupDistrict &&
      deliveryProvince &&
      pickupDistrict &&
      deliveryDistrict
    ) {
      setHighlightPriceFromClient(true);

      const priceFound = selectedPriceClient?.price_details.find(
        (item) =>
          item.pickup_province === pickupProvince &&
          item.pickup_district === pickupDistrict &&
          item.delivery_province === deliveryProvince &&
          item.delivery_district === deliveryDistrict
      );
      if (priceFound) {
        let value = '';
        if (unitSelected === UNIT_TYPES.trip) {
          value =`${truckCapacity}T`;
        } else {
          value = packageWeight ? `${packageWeight}T` : `${packageVolumn}K`;
        }
        const priceCalculated = findPrice(priceFound.weight_prices, value);
        form.setFieldValue("price_from_client", priceCalculated);
      } else {
        form.setFieldValue("price_from_client", 0);
      }

      const timer = setTimeout(() => setHighlightPriceFromClient(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [
    selectedPriceClient,
    packageWeight,
    packageVolumn,
    truckCapacity,
    pickupProvince,
    pickupDistrict,
    deliveryProvince,
    deliveryDistrict,
  ]);

  // watch changes, update the price_for_contractor
  useEffect(() => {
    // change contractor price selected
    // change the pickup_province, pickup_district, delivery_province, delivery_district
    if (
      selectedPriceContractor &&
      (packageWeight || packageVolumn || truckCapacity) &&
      pickupDistrict &&
      deliveryProvince &&
      pickupDistrict &&
      deliveryDistrict
    ) {
      setHighlightPriceForContractor(true);

      const priceFound = selectedPriceContractor?.price_details.find(
        (item) =>
          item.pickup_province === pickupProvince &&
          item.pickup_district === pickupDistrict &&
          item.delivery_province === deliveryProvince &&
          item.delivery_district === deliveryDistrict
      );

      const key = isInternal ? "trip_salary" : "price_for_contractor";

      if (priceFound) {
        let value = '';
        if (unitSelected === UNIT_TYPES.trip) {
          value =`${truckCapacity}T`;
        } else {
          value = packageWeight ? `${packageWeight}T` : `${packageVolumn}K`;
        }
        const priceCalculated = findPrice(priceFound.weight_prices, value);
        form.setFieldValue(key, priceCalculated);
      } else {
        form.setFieldValue(key, 0);
      }

      const timer = setTimeout(
        () => setHighlightPriceForContractor(false),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [
    selectedPriceContractor,
    packageWeight,
    truckCapacity,
    packageVolumn,
    pickupProvince,
    pickupDistrict,
    deliveryProvince,
    deliveryDistrict,
  ]);


  const handleSelectTruck = (truckId: string) => {
    const filterTruck = trucks.find(item => item.id === truckId)
    setSelectedTruck(filterTruck)
    form.setFieldValue("truck_capacity", filterTruck?.capacity)
  }

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          trip_count: 1,
          trip_salary: 0,
          order_time: dayjs(new Date()),
        }}
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
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

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Chọn Lái xe"
              name="driver_id"
              // rules={[{ required: true, message: "Hãy chọn lái xe!" }]}
            >
              <Select
                size="large"
                placeholder="Chọn lái xe"
                disabled={!selectedContractor?.id}
              >
                {selectedContractor?.id &&
                  drivers.map((driver) => (
                    <Option key={driver.id} value={driver.id}>
                      {driver.full_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item label="Chọn xe tải" name="truck_id">
              <Select
                size="large"
                placeholder="Chọn xe tải"
                disabled={!selectedContractor?.id}
                onChange={handleSelectTruck}
              >
                {selectedContractor?.id &&
                  trucks.map((truck) => (
                    <Option key={truck.id} value={truck.id}>
                      {truck.license_plate} - {truck.capacity}T / {truck.volume}
                      m³
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Nhãn hàng"
              name="client_id"
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
          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label={
                <div>
                  Bảng giá nhãn hàng{" "}
                  {selectedClient && (
                    <Upload
                      name="avatar"
                      className="avatar-uploader cursor-pointer"
                      customRequest={({ file, onSuccess, onError }: any) => {
                        handleFileUpload(file, "client")
                          .then(() => onSuccess?.(null, file))
                          .catch((err) => onError?.(err));
                      }}
                      showUploadList={false}
                      accept=".xlsx,.xls"
                    >
                      <Link to={""}>Thêm mới?</Link>
                    </Upload>
                  )}
                </div>
              }
              name="price_from_client_id"
            >
              <Select
                size="large"
                placeholder="Chọn Bảng Giá"
                disabled={!selectedClient}
                onChange={handleSelectPriceClient}
              >
                {priceListClient &&
                  priceListClient.map((priceTable, index) => (
                    <Option key={priceTable.id} value={priceTable.id}>
                      {priceTable.file_name} {index === 0 ? "(Mới nhất)" : ""}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label={
                <div>
                  {isInternal ? "Bảng tính lương " : "Bảng giá nhà thầu "}
                  {selectedContractor?.id && (
                    <Upload
                      name="avatar"
                      className="avatar-uploader cursor-pointer"
                      customRequest={({ file, onSuccess, onError }: any) => {
                        handleFileUpload(file, "contractor")
                          .then(() => onSuccess?.(null, file)) // Indicate success to antd Upload
                          .catch((err) => onError?.(err)); // Handle errors
                      }}
                      showUploadList={false}
                      accept=".xlsx,.xls"
                    >
                      <Link to={""}>Thêm mới?</Link>
                    </Upload>
                  )}
                </div>
              }
              name="price_for_contractor_id"
            >
              <Select
                size="large"
                placeholder="Chọn Bảng Giá"
                disabled={!selectedContractor?.id}
                onChange={handleSelectPriceContractor}
              >
                {priceListContractor &&
                  priceListContractor.map((priceTable, index) => (
                    <Option key={priceTable.id} value={priceTable.id}>
                      {priceTable.file_name} {index === 0 ? "(Mới nhất)" : ""}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Đơn vị tính"
              name="unit"
              rules={[{ required: true, message: "Hãy chọn Đơn vị tính!" }]}
            >
              <Select
                size="large"
                placeholder="Chọn đơn vị tính"
                onChange={handleUnitSelect}
                disabled={!selectedContractor}
              >
                <Option key={UNIT_TYPES.trip} value={UNIT_TYPES.trip}>
                  Theo Chuyến
                </Option>
                <Option key={UNIT_TYPES.weight} value={UNIT_TYPES.weight}>
                  Theo Tấn
                </Option>
                <Option key={UNIT_TYPES.volumn} value={UNIT_TYPES.volumn}>
                  Theo Khối
                </Option>
              </Select>
            </Form.Item>
          </Col>
          {unitSelected === UNIT_TYPES.trip && (
            <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
              <Form.Item
                label="Trọng tải xe"
                name="truck_capacity"
                rules={
                  unitSelected === UNIT_TYPES.trip
                    ? [{ required: true, message: "Nhập trọng tải xe" }]
                    : []
                }
              >
                <InputNumber
                  size="large"
                  placeholder="Nhập số tấn"
                  disabled={!selectedContractor}
                />
              </Form.Item>
            </Col>
          )}

          {(unitSelected === UNIT_TYPES.trip ||
            unitSelected === UNIT_TYPES.weight) && (
            <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
              <Form.Item
                label="Trọng tải của đơn hàng"
                name="package_weight"
                rules={
                  unitSelected === UNIT_TYPES.weight
                    ? [{ required: true, message: "Nhập số tấn của hàng" }]
                    : []
                }
              >
                <InputNumber
                  size="large"
                  placeholder="Nhập số tấn"
                  disabled={!selectedContractor}
                />
              </Form.Item>
            </Col>
          )}

          {unitSelected === UNIT_TYPES.volumn && (
            <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
              <Form.Item
                label="Số khối của hàng"
                name="package_volumn"
                rules={
                  unitSelected === UNIT_TYPES.volumn
                    ? [{ required: true, message: "Nhập số khối của hàng" }]
                    : []
                }
              >
                <InputNumber
                  size="large"
                  placeholder="Nhập số khối"
                  disabled={!selectedContractor}
                />
              </Form.Item>
            </Col>
          )}

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item label="Ngày tạo" name="order_time">
              <DatePicker
                size="large"
                className="w-full"
                format={"DD-MM-YYYY"}
              />
            </Form.Item>
          </Col>

          <Divider />

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Tỉnh đóng hàng"
              name="pickup_province"
              rules={[{ required: true, message: "Hãy chọn tỉnh/thành phố!" }]}
            >
              <SelectWithInput
                size="large"
                placeholder="Chọn tỉnh/thành phố"
                filterOption={searchByLabel}
                showSearch
                onChange={(value: string) =>
                  handleProvinceChange(value, "pickup_province")
                }
                options={locationLabels.allPickupProvinces}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              name="pickup_district"
              label="Huyện đóng hàng"
              rules={[{ required: true, message: "Hãy chọn Huyện" }]}
            >
              <SelectWithInput
                size="large"
                placeholder="Chọn quận/huyện"
                showSearch
                filterOption={searchByLabel}
                options={pickupDistrictList}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Tỉnh trả hàng"
              name="delivery_province"
              rules={[{ required: true, message: "Hãy chọn tỉnh/thành phố!" }]}
            >
              <SelectWithInput
                size="large"
                showSearch
                placeholder="Chọn tỉnh/thành phố"
                filterOption={searchByLabel}
                onChange={(value: string) =>
                  handleProvinceChange(value, "delivery_province")
                }
                options={locationLabels.allDeliveryProvinces}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              name="delivery_district"
              label="Huyện trả hàng"
              rules={[{ required: true, message: "Hãy chọn Huyện" }]}
            >
              <SelectWithInput
                size="large"
                placeholder="Chọn quận/huyện"
                showSearch
                filterOption={searchByLabel}
                options={deliveryDistrictList}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Cước vận chuyển-nhãn hàng"
              name="price_from_client"
              normalize={(value) => (value ? Number(value) : value)}
              rules={[{ required: true, message: "Hãy nhập giá từ nhãn hàng" }]}
            >
              <InputNumber
                size="large"
                placeholder="Nhập giá"
                isHighlight={highlightPriceFromClient}
              />
            </Form.Item>
          </Col>

          {isInternal ? (
            <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
              <Form.Item
                label="Luơng chuyến"
                name="trip_salary"
                normalize={(value) => (value ? Number(value) : value)}
                rules={[{ required: true, message: "Hãy nhập lương chuyến" }]}
              >
                <InputNumber
                  size="large"
                  placeholder="Nhập lương chuyến"
                  isHighlight={highlightPriceFromClient}
                />
              </Form.Item>
            </Col>
          ) : (
            <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
              <Form.Item
                label="Cước vận chuyển-nhà thầu"
                name="price_for_contractor"
                normalize={(value) => (value ? Number(value) : value)}
                rules={[
                  { required: true, message: "Hãy nhập giá cho nhà thầu" },
                ]}
              >
                <InputNumber
                  size="large"
                  placeholder="Nhập giá"
                  className={`w-full ${
                    highlightPriceForContractor
                      ? "bg-orange-500 animate-pulse"
                      : "bg-transparent"
                  }`}
                />
              </Form.Item>
            </Col>
          )}

          <Divider />

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Lương theo ngày"
              name="daily_salary"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <InputNumber size="large" placeholder="Nhập Lương theo ngày" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Số điểm"
              name="point_count"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <InputNumber size="large" placeholder="Nhập số điểm" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Lương điểm"
              name="point_salary"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <InputNumber size="large" placeholder="Nhập lương điểm" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Phí thu hồi"
              name="recovery_fee"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <InputNumber size="large" placeholder="Nhập phí thu hồi" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Bốc xếp"
              name="loading_salary"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <InputNumber size="large" placeholder="Nhập lương" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Tiền ăn"
              name="meal_fee"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <InputNumber size="large" placeholder="Nhập tiền ăn" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Vé bãi"
              name="parking_fee"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <InputNumber size="large" placeholder="Nhập vé bãi" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Tiền lưu ca"
              name="standby_fee"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <InputNumber size="large" placeholder="Nhập phí lưu ca" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Chi khác"
              name="other_salary"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <InputNumber size="large" placeholder="Nhập Chi khác" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Đổ dầu ngoài"
              name="outside_oil_fee"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <InputNumber size="large" placeholder="Nhập phí đổ dầu ngoài" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Chi dầu"
              name="oil_fee"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <InputNumber size="large" placeholder="Nhập chi dầu" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xxl={4}>
            <Form.Item
              label="Thu cước"
              name="charge_fee"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <InputNumber size="large" placeholder="Nhập thu cước" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item label="Ghi chú" name="notes">
              <TextArea
                size="large"
                placeholder="Nhập ghi chú (nếu có)"
                rows={2}
              />
            </Form.Item>
          </Col>

          <Col xs={24} xl={12}>
            <div>
              Lưu ý:
              <ul className="m-0">
                <li>
                  Nếu không có Huyện đóng hàng, Huyện trả hàng thì chọn "-"
                </li>
                <li>
                  Đơn hàng chọn theo Chuyến, thì cần phải chọn xe tải trước
                </li>
                <li>
                  Đơn hàng chọn theo Chuyến, thì tính tiền dựa trên trọng tải
                  của xe
                </li>
                <li>
                  Đơn hàng chọn theo Tấn/Khối, thì tính tiền dựa trên số
                  tấn/khối thực của hàng.
                </li>
              </ul>
            </div>
          </Col>
          {isReview && (
            <OrderDetails
              data={form.getFieldsValue()}
              isReadOnly={false}
              onClose={() => setIsReview(false)}
              client={selectedClient}
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
