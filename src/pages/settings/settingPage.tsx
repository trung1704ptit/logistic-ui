import { Row, Col, BreadcrumbProps, Form, Space, Input, Button } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { apiRoutes } from "@/routes/api";
import { webRoutes } from "@/routes/web";
import BasePageContainer from "@/components/layout/pageContainer";
import { useState } from "react";
import http from "@/lib/http";
import ErrorMessage from "@/components/Alert/Error";

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

  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        ...values,
        height: parseFloat(values.height),
        width: parseFloat(values.width),
        length: parseFloat(values.length),
        capacity: parseFloat(values.capacity),
        volume: parseFloat(values.volume),
      };
      setIsLoading(true);
      setIsError(false);
      const res = await http.post("/settings", payload);
      if (res && res.data) {
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
          <Col xs={24} sm={8}>
            <Form.Item
              label="Số chuyến đạt KPI tháng"
              name="kpi_threshold"
              rules={[{ required: true, message: "Hãy nhập số KPI" }]}
            >
              <Input size="large" placeholder="Ví dụ 45" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Tiền thưởng khi đạt KPI tháng"
              name="kpi_bonus"
              rules={[{ required: true, message: "Hãy nhập tiền KPI" }]}
            >
              <Input size="large" placeholder="Ví dụ 500000" />
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
