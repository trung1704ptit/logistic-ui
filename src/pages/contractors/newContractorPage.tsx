import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select, Alert, Space } from "antd";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useNavigate } from "react-router-dom";

import { PlusOutlined } from "@ant-design/icons";
import http from "@/lib/http";
import ErrorMessage from "@/components/Alert/Error";
import { fetchContractors } from "@/store/slices/contractorSlice";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
    {
      key: webRoutes.contractors,
      title: <Link to={webRoutes.contractors}>Nhà thầu</Link>,
    },
    {
      key: webRoutes.addNewContractors,
      title: <Link to={webRoutes.addNewContractors}>Thêm nhà thầu</Link>,
    },
  ],
};

interface Contractor {
  id: string;
  name: string;
  phoneNumber: string;
  address: string;
  note?: string;
}

const ContractorForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const appDispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleSubmit = async (values: Contractor) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await http.post("/contractors", values);
      if (res && res.data) {
        appDispatch(fetchContractors());
        navigate(webRoutes.contractors);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col xs={24} sm={12} lg={8} xl={6}>
            <Form.Item
              label="Tên nhà thầu"
              name="name"
              rules={[{ required: true, message: "Hãy nhập tên nhà thầu!" }]}
            >
              <Input placeholder="Nhập tên nhà thầu" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6}>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Hãy nhập số điện thoại!" },
                { pattern: /^\d+$/, message: "Số điện thoại không hợp lệ!" },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12} lg={8} xl={6}>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: "Hãy nhập địa chỉ!" }]}
            >
              <Input.TextArea placeholder="Nhập địa chỉ" rows={2} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={8} xl={6}>
            <Form.Item label="Ghi chú" name="note">
              <Input.TextArea placeholder="Nhập ghi chú (nếu có)" rows={2} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Space direction="vertical">
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              disabled={isLoading}
              loading={isLoading}
            >
              Thêm nhà thầu
            </Button>
            {isError && <ErrorMessage />}
          </Space>
        </Form.Item>
      </Form>
    </BasePageContainer>
  );
};

export default ContractorForm;
