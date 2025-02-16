import {
  Row,
  Col,
  BreadcrumbProps,
  Form,
  Space,
  Button,
  message,
} from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { apiRoutes } from "@/routes/api";
import { webRoutes } from "@/routes/web";
import BasePageContainer from "@/components/layout/pageContainer";
import { useEffect, useState } from "react";
import http from "@/lib/http";
import ErrorMessage from "@/components/Alert/Error";
import InputNumber from "@/components/InputNumber";

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
    {
      key: webRoutes.settings,
      title: <Link to={webRoutes.settings}>Cài đặt</Link>,
    },
  ],
};

const DriverListPage = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: ISetting) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const payload = {
        settings: values,
      };
      const res = await http.post(apiRoutes.settings, payload);
      if (res && res.data) {
        message.success("Cập nhật cài đặt thành công");
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await http.get(apiRoutes.settings);
      if (res && res?.data) {
        form.setFieldsValue(res.data.data.settings);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} xl={6}>
            <Form.Item
              label="Số chuyến đạt KPI tháng"
              name="kpi_threshold"
              rules={[{ required: true, message: "Hãy nhập số KPI" }]}
            >
              <InputNumber
                size="large"
                placeholder="Ví dụ 45"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} xl={6}>
            <Form.Item
              label="Tiền thưởng khi đạt KPI tháng"
              name="kpi_bonus"
              rules={[{ required: true, message: "Hãy nhập tiền KPI" }]}
            >
              <InputNumber
                size="large"
                placeholder="Ví dụ 500000"
                className="w-full"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} xl={6}>
            <Form.Item
              label="Thuế VAT %"
              name="vat"
              rules={[{ required: true, message: "Hãy nhập thuế VAT" }]}
            >
              <InputNumber
                size="large"
                placeholder="Ví dụ 8"
                className="w-full"
              />
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
                  Lưu lại
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

export default DriverListPage;
