import React from "react";
import { Form, Input, DatePicker, Button, Row, Col } from "antd";
import { Avatar, BreadcrumbProps, Modal, Space } from "antd";
import { apiRoutes } from "@/routes/api";
import { webRoutes } from "@/routes/web";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import BasePageContainer from "@/components/layout/pageContainer";

const { TextArea } = Input;

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
              label="Căn cước công dân"
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
            <Form.Item
              label="Ngày Sinh"
              name="birthDate"
              rules={[{ required: true, message: "Hãy chọn ngày sinh!" }]}
            >
              <DatePicker
                size="large"
                placeholder="Chọn ngày sinh"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Quê Quán"
              name="hometown"
              rules={[{ required: true, message: "Hãy nhập quê quán!" }]}
            >
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
