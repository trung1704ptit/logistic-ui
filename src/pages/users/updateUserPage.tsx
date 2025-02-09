import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import http from "@/lib/http";
import ErrorMessage from "@/components/Alert/Error";
import { apiRoutes } from "@/routes/api";
import { AxiosResponse } from "axios";
import { logout } from "@/store/slices/adminSlice";

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
      title: <Link to={webRoutes.newUser}>Cập nhật Tài khoản</Link>,
    },
  ],
};

const UpdateTruckForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get("id");
  const option = params.get("option");

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          setIsLoading(true);
          const res = await http.get(`${apiRoutes.users}/${id}`);
          if (res.data.data) {
            form.setFieldsValue(res.data.data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUser();
    } else {
      setIsError(true);
    }
  }, [id, form]);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      setIsError(false);
      let res: AxiosResponse;
      if (option === "edit") {
        res = await http.put(`${apiRoutes.users}/${id}`, values);
      } else {
        if (values.password !== values.password_confirm) {
          message.error(
            "Mật khẩu và xác nhận mật khẩu không trùng khớp. Vui lòng kiểm tra lại!"
          );
          return;
        }
        res = await http.post(`${apiRoutes.resetPassword}/${id}`, values);
      }
      if (res && res.data) {
        message.success(
          "Cập nhật thành công!"
        );
        navigate(webRoutes.users);
        if (option === "reset-password") {
          dispatch(logout());
        }
      }
    } catch (error) {
      setIsError(true);
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
              rules={[{ required: true, message: "Hãy nhập tên" }]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Email" name="email">
              <Input size="large" disabled />
            </Form.Item>
          </Col>

          {option === "reset-password" && (
            <>
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
            </>
          )}

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
                  Cập nhật
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
              {isError && <ErrorMessage />}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </BasePageContainer>
  );
};

export default UpdateTruckForm;
