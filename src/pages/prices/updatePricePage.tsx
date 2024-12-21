import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Select, Space } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const mockProvinces = [
  {
    Type: "province",
    Code: "01",
    FullName: "Thành phố Hà Nội",
    CodeName: "ha_noi",
    District: [
      {
        Type: "district",
        Code: "001",
        FullName: "Quận Ba Đình",
        CodeName: "ba_dinh"
      },
      {
        Type: "district",
        Code: "002",
        FullName: "Quận Hoàn Kiếm",
        CodeName: "hoan_kiem"
      },
      {
        Type: "district",
        Code: "003",
        FullName: "Quận Tây Hồ",
        CodeName: "tay_ho"
      },
      {
        Type: "district",
        Code: "004",
        FullName: "Quận Cầu Giấy",
        CodeName: "cau_giay"
      },
      {
        Type: "district",
        Code: "005",
        FullName: "Quận Đống Đa",
        CodeName: "dong_da"
      }
    ]
  },
  {
    Type: "province",
    Code: "02",
    FullName: "Thành phố Hồ Chí Minh",
    CodeName: "ho_chi_minh",
    District: [
      {
        Type: "district",
        Code: "006",
        FullName: "Quận 1",
        CodeName: "quan_1"
      },
      {
        Type: "district",
        Code: "007",
        FullName: "Quận 3",
        CodeName: "quan_3"
      },
      {
        Type: "district",
        Code: "008",
        FullName: "Quận 7",
        CodeName: "quan_7"
      },
      {
        Type: "district",
        Code: "009",
        FullName: "Quận Bình Thạnh",
        CodeName: "binh_thanh"
      },
      {
        Type: "district",
        Code: "010",
        FullName: "Thành phố Thủ Đức",
        CodeName: "thu_duc"
      }
    ]
  }
];

const truckWeights = [
  { value: "1.25T", label: "1.25T" },
  { value: "1.5T", label: "1.5T" },
  { value: "2.5T", label: "2.5T" },
  { value: "3.5T", label: "3.5T" },
  { value: "5T", label: "5T" },
  { value: "8T", label: "8T" },
  { value: "10T", label: "10T" },
  { value: "13T", label: "13T" },
  { value: "15T", label: "15T" }
];

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
    {
      key: webRoutes.drivers,
      title: <Link to={webRoutes.drivers}>Tài xế</Link>,
    },
    {
      key: webRoutes.addNewDrivers,
      title: <Link to={webRoutes.addNewDrivers}>Thêm tài xế</Link>,
    },
  ],
};

const AddDriverForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleProvinceChange = (value: any, field: any) => {
    form.setFieldsValue({ [field]: undefined });
  };

  const handleSubmit = (values: any) => {
    console.log("Submitted values:", values);
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Điểm đóng hàng"
              name="pickupProvince"
              rules={[{ required: true, message: "Hãy chọn tỉnh/thành phố!" }]}
            >
              <Select
                size="large"
                placeholder="Chọn tỉnh/thành phố"
                onChange={(value) => handleProvinceChange(value, "pickupDistrict")}
              >
                {mockProvinces.map((province) => (
                  <Option key={province.Code} value={province.Code}>
                    {province.FullName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="pickupDistrict"
              rules={[{ required: true, message: "Hãy chọn quận/huyện!" }]}
            >
              <Select size="large" placeholder="Chọn quận/huyện">
                {mockProvinces
                  .find((province) => province.Code === form.getFieldValue("pickupProvince"))?.District.map((district) => (
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
                placeholder="Chọn tỉnh/thành phố"
                onChange={(value) => handleProvinceChange(value, "deliveryDistrict")}
              >
                {mockProvinces.map((province) => (
                  <Option key={province.Code} value={province.Code}>
                    {province.FullName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="deliveryDistrict"
              rules={[{ required: true, message: "Hãy chọn quận/huyện!" }]}
            >
              <Select size="large" placeholder="Chọn quận/huyện">
                {mockProvinces
                  .find((province) => province.Code === form.getFieldValue("deliveryProvince"))?.District.map((district) => (
                    <Option key={district.Code} value={district.Code}>
                      {district.FullName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item label="Trọng tải" required>
              {truckWeights.map((weight) => (
                <Form.Item
                  key={weight.value}
                  name={`price_${weight.value}`}
                  label={weight.label}
                  style={{ display: "inline-block", width: "calc(25% - 8px)", marginRight: 8 }}
                >
                  <Input size="large" placeholder="Nhập giá" />
                </Form.Item>
              ))}
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item label="Ghi chú" name="note">
              <TextArea size="large" placeholder="Nhập ghi chú (nếu có)" rows={4} />
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
                  Lưu thông tin
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

export default AddDriverForm;
