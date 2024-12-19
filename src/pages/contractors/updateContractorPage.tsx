import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select } from "antd";
import BasePageContainer from "@/components/layout/pageContainer";
import { Avatar, BreadcrumbProps, Space, Divider } from "antd";
// import { apiRoutes } from "@/routes/api";
import { webRoutes } from "@/routes/web";
import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";

const { TextArea } = Input;
const { Option } = Select;

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
      key: webRoutes.updateContractors,
      title: <Link to={webRoutes.updateContractors}>Cập nhật nhà thầu</Link>,
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
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [editingContractor, setEditingContractor] = useState<Contractor | null>(
    null
  );

  const navigate = useNavigate();

  const handleSubmit = (values: Contractor) => {
    if (editingContractor) {
      // Update contractor
      setContractors((prev) =>
        prev.map((contractor) =>
          contractor.id === editingContractor.id
            ? { ...contractor, ...values }
            : contractor
        )
      );
      setEditingContractor(null);
    } else {
      // Add new contractor
      setContractors((prev) => [
        ...prev,
        { ...values, id: Date.now().toString() },
      ]);
    }
    form.resetFields();
  };

  const handleCancel = () => {
    navigate(webRoutes.contractors);
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Tên nhà thầu"
                name="name"
                rules={[{ required: true, message: "Hãy nhập tên nhà thầu!" }]}
              >
                <Input placeholder="Nhập tên nhà thầu" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
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
                <Input.TextArea placeholder="Nhập địa chỉ" rows={3} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Ghi chú" name="note">
                <Input.TextArea placeholder="Nhập ghi chú (nếu có)" rows={3} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Cập nhật tài xế
              </Button>
              <Button
                type="default"
                icon={<CloseOutlined />}
                onClick={handleCancel}
              >
                Thoát
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <Divider style={{ borderColor: "#7cb305" }}></Divider>
        <Title level={5}>Danh sách xe tải</Title>

        <Divider style={{ borderColor: "#7cb305" }}></Divider>
        <Title level={5}>Danh sách tài xế</Title>
      </div>
    </BasePageContainer>
  );
};

export default ContractorForm;
