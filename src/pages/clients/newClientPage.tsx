import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import http from "@/lib/http";
import ErrorMessage from "@/components/Alert/Error";
import { fetchTrucks } from "@/store/slices/truckSlice";
import { fetchContractors } from "@/store/slices/contractorSlice";

const { TextArea } = Input;

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
    {
      key: webRoutes.clients,
      title: <Link to={webRoutes.clients}>Nhãn hàng</Link>,
    },
    {
      key: webRoutes.addNewClient,
      title: <Link to={webRoutes.addNewClient}>Thêm nhãn hàng</Link>,
    },
  ],
};

const AddTruckForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const appDispatch = useDispatch<AppDispatch>();
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
      const res = await http.post("/clients", payload);
      if (res && res.data) {
        appDispatch(fetchTrucks());
        appDispatch(fetchContractors());
        navigate(webRoutes.clients);
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
              label="Tên nhãn hàng"
              name="name"
              rules={[{ required: true, message: "Hãy nhập tên nhãn hàng!" }]}
            >
              <Input size="large"/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Địa chỉ"
              name="address"
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Số điện thoại"
              name="height"
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Ghi chú" name="note">
              <TextArea
                size="large"
                placeholder="Nhập ghi chú (nếu có)"
                rows={1}
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
                  Thêm nhãn hàng
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

export default AddTruckForm;
