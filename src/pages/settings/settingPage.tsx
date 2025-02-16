import { Row, Col, BreadcrumbProps, Form, Space, Button, message } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import BasePageContainer from "@/components/layout/pageContainer";
import { useEffect, useState } from "react";
import ErrorMessage from "@/components/Alert/Error";
import InputNumber from "@/components/InputNumber";
import { updateSettings } from "@/store/slices/settingSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

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
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.setting.settings);

  const handleSubmit = (payload: ISetting) => {
    try {
      setIsLoading(true);
      dispatch(updateSettings(payload) as any);
      message.success("Cập nhật thành công");
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    form.setFieldsValue(settings)
  }, [settings, form]);

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} xl={6}>
            <Form.Item
              label="Số chuyến đạt KPI tháng"
              name="kpi_threshold"
              rules={[{ required: true, message: "Hãy nhập số KPI" }]}
            >
              <InputNumber size="large" placeholder="Ví dụ 45" />
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
