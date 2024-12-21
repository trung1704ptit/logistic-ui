import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const contractorList = [
  { id: "ct1", name: "Nhà thầu A" },
  { id: "ct2", name: "Nhà thầu B" },
  { id: "ct3", name: "Nhà thầu C" },
];

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
      key: webRoutes.addNewTruck,
      title: <Link to={webRoutes.addNewTruck}>Thêm xe tải</Link>,
    },
  ],
};

const AddTruckForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isContractorVehicle, setIsContractorVehicle] = useState(false);
  const navigate = useNavigate();

  const handleFormChange = (changedValues: any) => {
    if (changedValues.vehicleType) {
      setIsContractorVehicle(changedValues.vehicleType === "contractor");
      if (changedValues.vehicleType === "internal") {
        form.setFieldsValue({ contractor: undefined }); // Xóa giá trị nhà thầu nếu là nội bộ
      }
    }
  };

  const handleSubmit = (values: any) => {
    const formattedValues = {
      ...values,
    };
    console.log("Submitted values:", formattedValues);
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
        onValuesChange={handleFormChange}
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Biển kiểm soát"
              name="licensePlate"
              rules={[{ required: true, message: "Hãy nhập biển kiểm soát!" }]}
            >
              <Input size="large" placeholder="Nhập biển kiểm soát" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Tải trọng xe (T)"
              name="capacity"
              rules={[{ required: true, message: "Hãy nhập tải trọng xe!" }]}
            >
              <Input size="large" placeholder="Ví dụ 2.5" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Dài (m)"
              name="length"
              rules={[{ required: true, message: "Hãy nhập chiều dài!" }]}
            >
              <Input size="large" placeholder="Nhập chiều dài" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Rộng (m)"
              name="width"
              rules={[{ required: true, message: "Hãy nhập chiều rộng!" }]}
            >
              <Input size="large" placeholder="Nhập chiều rộng" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Cao (m)"
              name="height"
              rules={[{ required: true, message: "Hãy nhập chiều cao!" }]}
            >
              <Input size="large" placeholder="Nhập chiều cao" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Mét khối"
              name="volume"
              rules={[{ required: true, message: "Hãy nhập thể tích!" }]}
            >
              <Input size="large" placeholder="Nhập thể tích (m³)" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Loại xe"
              name="vehicleType"
              rules={[{ required: true, message: "Hãy chọn loại xe!" }]}
            >
              <Select size="large" placeholder="Chọn loại xe">
                <Option value="internal">Nội bộ</Option>
                <Option value="contractor">Nhà thầu</Option>
              </Select>
            </Form.Item>
          </Col>
          {isContractorVehicle && (
            <Col xs={24} sm={12}>
              <Form.Item
                label="Nhà Thầu"
                name="contractor"
                rules={[{ required: true, message: "Hãy chọn nhà thầu!" }]}
              >
                <Select size="large" placeholder="Chọn nhà thầu">
                  {contractorList.map((contractor) => (
                    <Option key={contractor.id} value={contractor.id}>
                      {contractor.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
          <Col xs={24}>
            <Form.Item label="Ghi chú" name="note">
              <TextArea
                size="large"
                placeholder="Nhập ghi chú (nếu có)"
                rows={4}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<PlusOutlined />}
                >
                  Thêm xe tải
                </Button>
                <Button
                  type="default"
                  icon={<CloseOutlined />}
                  onClick={handleCancel}
                >
                  Thoát
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </BasePageContainer>
  );
};

export default AddTruckForm;
