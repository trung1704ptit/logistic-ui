import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
  Divider,
} from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { District, provinceList } from "@/lib/provinces";

import moment from "moment";
import { searchByLabel } from "@/lib/utils";
import { contractors, trucks, driverList } from "@/__mocks__";

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
  const [selectedContractor, setSelectedContractor] = useState<string | null>(
    null
  );
  const [pickupDistricts, setPickupDistricts] = useState<District[]>([]);
  const [deliveryDistricts, setDeliveryDistricts] = useState<District[]>([]);
  const navigate = useNavigate();

  const handleContractorChange = (value: string) => {
    setSelectedContractor(value);
    form.setFieldsValue({ driver: undefined, truck: undefined });
  };

  const handleSubmit = (values: any) => {
    console.log("Submitted values:", values);
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
                style={{ width: "100%" }}
                defaultValue={moment()} // Use moment for the default value
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
                disabled={!selectedContractor}
              >
                {selectedContractor &&
                  driverList.map((driver) => (
                    <Option key={driver.id} value={driver}>
                      {driver.fullName}
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
                disabled={!selectedContractor}
              >
                {selectedContractor &&
                  trucks.map((truck) => (
                    <Option key={truck.id} value={truck}>
                      {truck.capacity}
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
              label="Số lượng chuyến"
              name="tripCount"
              rules={[{ required: true, message: "Hãy nhập số lượng chuyến!" }]}
            >
              <Input size="large" type="number" placeholder="1" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Phí điểm" name="pointFee">
              <Input size="large" type="number" placeholder="Nhập phí điểm" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Phí lưu ca" name="standbyFee">
              <Input size="large" type="number" placeholder="Nhập phí lưu ca" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item label="Vé bãi" name="parkingFee">
              <Input size="large" type="number" placeholder="Nhập vé bãi" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item label="Chi phí khác" name="otherFee">
              <Input
                size="large"
                type="number"
                placeholder="Nhập chi phí khác"
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<PlusOutlined />}
                >
                  Thêm đơn hàng
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
