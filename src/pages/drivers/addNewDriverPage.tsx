import React, { useState } from "react";
import { Form, Input, DatePicker, Button, Row, Col, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { Avatar, BreadcrumbProps, Modal, Space } from "antd";
import { apiRoutes } from "@/routes/api";
import { webRoutes } from "@/routes/web";
import { Link } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

// Fake danh sách nhà thầu
const contractorList = [
  { id: "ct1", name: "Nhà thầu A" },
  { id: "ct2", name: "Nhà thầu B" },
  { id: "ct3", name: "Nhà thầu C" },
];

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
    {
      key: webRoutes.drivers,
      title: <Link to={webRoutes.drivers}>Tài xế</Link>,
    },
    {
      key: webRoutes.addNewDrivers,
      title: <Link to={webRoutes.addNewDrivers}>Thêm tài xế</Link>,
    },
  ],
};

const AddDriverForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isVendorDriver, setIsVendorDriver] = useState(false); // Trạng thái xác định loại tài xế

  const handleFormChange = (changedValues: any) => {
    if (changedValues.driverType) {
      setIsVendorDriver(changedValues.driverType === "vendor");
      if (changedValues.driverType === "internal") {
        form.setFieldsValue({ contractor: undefined }); // Xóa giá trị nhà thầu nếu là nội bộ
      }
    }
  };

  const handleSubmit = (values: any) => {
    const formattedValues = {
      ...values,
      issueDate: values.issueDate
        ? values.issueDate.format("YYYY-MM-DD")
        : null,
      birthDate: values.birthDate
        ? values.birthDate.format("YYYY-MM-DD")
        : null,
      licenseExpiry: values.licenseExpiry
        ? values.licenseExpiry.format("YYYY-MM-DD")
        : null,
    };
    console.log("Submitted values:", formattedValues);
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleFormChange} // Theo dõi thay đổi giá trị form
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: "Hãy nhập họ và tên!" }]}
            >
              <Input size="large" placeholder="Nhập họ và tên" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Số Điện Thoại"
              name="phoneNumber"
              rules={[
                { required: true, message: "Hãy nhập số điện thoại!" },
                { pattern: /^\d+$/, message: "Số điện thoại không hợp lệ!" },
              ]}
            >
              <Input size="large" placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Căn cước công dân"
              name="idCard"
              rules={[{ required: true, message: "Hãy nhập CCCD!" }]}
            >
              <Input size="large" placeholder="Nhập số CCCD" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Ngày Cấp"
              name="issueDate"
              rules={[{ required: true, message: "Hãy chọn ngày cấp!" }]}
            >
              <DatePicker
                size="large"
                placeholder="Chọn ngày cấp"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Ngày Sinh" name="birthDate">
              <DatePicker
                size="large"
                placeholder="Chọn ngày sinh"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Quê Quán" name="hometown">
              <Input size="large" placeholder="Nhập quê quán" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Số Bằng Lái Xe"
              name="licenseNumber"
              rules={[{ required: true, message: "Hãy nhập số bằng lái xe!" }]}
            >
              <Input size="large" placeholder="Nhập số bằng lái xe" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Ngày Hết Hạn"
              name="licenseExpiry"
              rules={[{ required: true, message: "Hãy chọn ngày hết hạn!" }]}
            >
              <DatePicker
                size="large"
                placeholder="Chọn ngày hết hạn"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Loại tài xế"
              name="driverType"
              rules={[{ required: true, message: "Hãy chọn loại tài xế!" }]}
            >
              <Select size="large" placeholder="Chọn loại tài xế">
                <Option value="internal">Nội bộ</Option>
                <Option value="vendor">Nhà thầu</Option>
              </Select>
            </Form.Item>
          </Col>

          {isVendorDriver && ( // Hiển thị khi là nhà thầu
            <Col xs={24} sm={12}>
              <Form.Item
                label="Nhà Thầu"
                name="contractor"
                rules={[{ required: true, message: "Hãy chọn nhà thầu!" }]}
              >
                <Select size="large" placeholder="Chọn nhà thầu">
                  {contractorList.map((contractor) => (
                    <Option key={contractor.id} value={contractor.id}>
                      {contractor.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}

          <Col xs={24}>
            <Form.Item label="Ghi Chú" name="note">
              <TextArea
                size="large"
                placeholder="Nhập ghi chú (nếu có)"
                rows={4}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon={<PlusOutlined />}
              >
                Thêm tài xế
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </BasePageContainer>
  );
};

export default AddDriverForm;
