import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space, Modal, Card } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";

import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { IClient } from "@/interfaces/client";
import http from "@/lib/http";
import ErrorMessage from "@/components/Alert/Error";
import { apiRoutes } from "@/routes/api";
import { fetchClients } from "@/store/slices/clientSlice";

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
      key: webRoutes.updateContractors,
      title: <Link to={webRoutes.updateContractors}>Cập nhật nhãn hàng</Link>,
    },
  ],
};

const ContractorForm: React.FC = () => {
  const [form] = Form.useForm();
  const [editingContractor, setEditingClient] = useState<IClient>();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const clients = useSelector((state: RootState) => state.client.clients);

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (clients) {
      const clientId = params.get("id");
      const client: IClient | undefined = clients.find(
        (item) => item.id === clientId
      );
      if (client && client.id !== editingContractor?.id) {
        setEditingClient(client);
        form.setFieldsValue(client);
      }
    }
  }, [clients, params]);


  const handleSubmit = async (client: IClient) => {
    if (editingContractor) {
      try {
        setIsUpdateLoading(true);
        setIsUpdateError(false);
        const res = await http.put(
          `${apiRoutes.clients}/${editingContractor.id}`,
          client
        );
        if (res && res.data) {
          message.success("Cập nhật thành công")
          dispatch(fetchClients())
          navigate(webRoutes.clients);
        }
      } catch (error) {
        setIsUpdateError(true);
      } finally {
        setIsUpdateLoading(false);
      }
    }
  };

  const handleCancel = () => {
    navigate(webRoutes.clients);
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxWidth: 800, margin: "0 auto" }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Tên nhãn hàng"
                name="name"
                rules={[{ required: true, message: "Hãy nhập tên nhãn hàng!" }]}
              >
                <Input placeholder="Nhập tên nhãn hàng" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
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
            <Col xs={24} sm={12}>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Hãy nhập địa chỉ!" }]}
              >
                <Input.TextArea placeholder="Nhập địa chỉ" rows={2} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Ghi chú" name="note">
                <Input.TextArea placeholder="Nhập ghi chú (nếu có)" rows={2} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Cập nhật nhãn hàng
              </Button>
              <Button
                type="default"
                icon={<CloseOutlined />}
                onClick={handleCancel}
                loading={isUpdateLoading}
                disabled={isUpdateLoading}
              >
                Thoát
              </Button>
            </Space>
            {isUpdateError && <ErrorMessage />}
          </Form.Item>
        </Form>
      </Card>
    </BasePageContainer>
  );
};

export default ContractorForm;
