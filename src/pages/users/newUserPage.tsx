import React, { useState } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useNavigate } from "react-router-dom";
import http from "@/lib/http";
import ErrorMessage from "@/components/Alert/Error";
import { apiRoutes } from "@/routes/api";
import axios from "axios";

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
    {
      key: webRoutes.users,
      title: <Link to={webRoutes.users}>Tài khoản</Link>,
    },
    {
      key: webRoutes.newUser,
      title: <Link to={webRoutes.newUser}>Thêm tài khoản</Link>,
    },
  ],
};

const AddTruckForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const res = await http.post(apiRoutes.register, values);
      if (res && res.data) {
        navigate(webRoutes.users);
      }
    } catch (error) {
      let message = '';

      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data || error.message);

        if (error?.response?.data?.message.includes("Passwords do not match")) {
          message = 'Mật khẩu và xác nhận mật khẩu không trùng khớp. Vui lòng kiểm tra lại!'
        } else if (error?.response?.data?.message.includes("already exists")) {
          message = 'Tài khoản email đã tồn tại, vui lòng chọn email khác'
        }

      } else {
        console.error("Unexpected Error:", error);
      }
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
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
              label="Tên tài khoản"
              name="name"
              rules={[{ required: true, message: "Hãy nhập tên tài khoản!" }]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Email" name="email">
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Mật khẩu" name="password">
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Xác nhận Mật khẩu" name="password_confirm">
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="shadow-none"
                  icon={<PlusOutlined />}
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Thêm tài khoản
                </Button>
                <Button
                  type="default"
                  className="shadow-none"
                  icon={<CloseOutlined />}
                  onClick={handleCancel}
                >
                  Thoát
                </Button>
              </Space>
              {errorMessage && <ErrorMessage message={errorMessage} />}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </BasePageContainer>
  );
};

export default AddTruckForm;
