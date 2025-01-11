import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select } from "antd";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
// import Title from "antd/lib/typography/Title";

const { TextArea } = Input;
const { Option } = Select;

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
    {
      key: webRoutes.trucks,
      title: <Link to={webRoutes.trucks}>Xe tải</Link>,
    },
    {
      key: webRoutes.updateTruck,
      title: <Link to={webRoutes.updateTruck}>Cập nhật xe tải</Link>,
    },
  ],
};

interface Truck {
  id: string;
  licensePlate: string;
  model: string;
  capacity: string;
  status: string;
  note?: string;
}

const TruckForm: React.FC = () => {
  const [form] = Form.useForm();
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [editingTruck, setEditingTruck] = useState<Truck | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (values: Truck) => {
    if (editingTruck) {
      // Update truck
      setTrucks((prev) =>
        prev.map((truck) =>
          truck.id === editingTruck.id ? { ...truck, ...values } : truck
        )
      );
      setEditingTruck(null);
    } else {
      // Add new truck
      setTrucks((prev) => [
        ...prev,
        { ...values, id: Date.now().toString() },
      ]);
    }
    form.resetFields();
    navigate(webRoutes.trucks);
  };

  const handleCancel = () => {
    navigate(webRoutes.trucks);
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Biển số xe"
                name="licensePlate"
                rules={[{ required: true, message: "Hãy nhập biển số xe!" }]}
              >
                <Input placeholder="Nhập biển số xe" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Mẫu xe"
                name="model"
                rules={[{ required: true, message: "Hãy nhập mẫu xe!" }]}
              >
                <Input placeholder="Nhập mẫu xe" size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Tải trọng"
                name="capacity"
                rules={[{ required: true, message: "Hãy nhập tải trọng!" }]}
              >
                <Input placeholder="Nhập tải trọng" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[{ required: true, message: "Hãy chọn trạng thái!" }]}
              >
                <Select placeholder="Chọn trạng thái" size="large">
                  <Option value="available">Sẵn sàng</Option>
                  <Option value="in_use">Đang sử dụng</Option>
                  <Option value="maintenance">Bảo trì</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24}>
              <Form.Item label="Ghi chú" name="note">
                <TextArea placeholder="Nhập ghi chú (nếu có)" rows={2} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Cập nhật xe tải
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
      </div>
    </BasePageContainer>
  );
};

export default TruckForm;
