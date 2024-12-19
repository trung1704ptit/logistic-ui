import React, { useState } from "react";
import { Form, Input, Table, Button, Row, Col, Select } from "antd";
import BasePageContainer from "@/components/layout/pageContainer";
import { Avatar, BreadcrumbProps, Modal, Space } from "antd";
import { apiRoutes } from "@/routes/api";
import { webRoutes } from "@/routes/web";
import { Link } from "react-router-dom";

import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";

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
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [editingContractor, setEditingContractor] = useState<Contractor | null>(
    null
  );

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

  const handleEdit = (contractor: Contractor) => {
    setEditingContractor(contractor);
    form.setFieldsValue(contractor);
  };

  const handleDelete = (contractor: Contractor) => {
    Modal.confirm({
      title: "Xác nhận xóa nhà thầu",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc muốn xóa nhà thầu ${contractor.name}?`,
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () =>
        setContractors((prev) =>
          prev.filter((item) => item.id !== contractor.id)
        ),
    });
  };

  const columns = [
    {
      title: "Tên nhà thầu",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, contractor: Contractor) => (
        <Space>
          <Button type="dashed" onClick={() => handleEdit(contractor)}>
            Sửa
          </Button>
          <Button danger onClick={() => handleDelete(contractor)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Tên nhà thầu"
              name="name"
              rules={[{ required: true, message: "Hãy nhập tên nhà thầu!" }]}
            >
              <Input placeholder="Nhập tên nhà thầu" size="large"/>
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
              <Input placeholder="Nhập số điện thoại" size="large"/>
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
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            {editingContractor ? "Cập nhật nhà thầu" : "Thêm nhà thầu"}
          </Button>
        </Form.Item>
      </Form>
    </BasePageContainer>
  );
};

export default ContractorForm;
