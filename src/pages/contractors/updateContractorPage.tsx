import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select } from "antd";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space, Divider, Modal } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";

import { ProTable, ProColumns, RequestData } from "@ant-design/pro-components";
import { PlusOutlined } from "@ant-design/icons";
import { driverList } from "@/__mocks__";
import { removeVietnameseTones } from "@/lib/utils";

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
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [filteredDriverList, setFilteredDriverList] = useState(driverList);

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

  // Handle driver edit
  const handleEditDriver = (driver: any) => {
    navigate(`${webRoutes.updateDrivers}?id=${driver.id}`);
  };

  // Handle driver deletion
  const handleDeleteDriver = (driver: any) => {
    Modal.confirm({
      title: "Xác nhận xóa tài xế",
      content: `Bạn có chắc muốn xóa tài xế ${driver.fullName}?`,
      onOk: () => {
        console.log("Deleted driver:", driver.fullName);
      },
    });
  };

  // Columns configuration for ProTable
  const columns: ProColumns[] = [
    {
      title: "Họ và Tên",
      dataIndex: "fullName",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phoneNumber",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Căn Cước Công Dân",
      dataIndex: "idCard",
      sorter: false,
      align: "center",
    },
    {
      title: "Số bằng lái",
      dataIndex: "licenseNumber",
      sorter: false,
      align: "center",
    },
    {
      title: "Hành động",
      align: "center",
      key: "actions",
      render: (_, row) => (
        <Space>
          <Button type="dashed" onClick={() => handleEditDriver(row)}>
            Chi tiết
          </Button>
          <Button danger onClick={() => handleDeleteDriver(row)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // Example search function
  const handleSearchDriver = (searchTerm: string) => {
    const normalizedSearchTerm = removeVietnameseTones(
      searchTerm.toLowerCase()
    );

    const filtered = driverList.filter((driver: any) =>
      Object.keys(driver).some((key) =>
        removeVietnameseTones(String(driver[key]))
          .toLowerCase()
          .includes(normalizedSearchTerm)
      )
    );

    setFilteredDriverList(filtered);
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
                Cập nhật nhà thầu
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

        <Divider></Divider>
        <Title level={5}>Danh sách xe tải</Title>
        <ProTable
          columns={columns}
          cardBordered={true}
          cardProps={{
            extra: (
              <Space>
                <Input
                  placeholder="Tìm kiếm tài xế..."
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    handleSearchDriver(value);
                  }}
                  style={{ minWidth: "15%" }}
                />
                <Link to={`${webRoutes.addNewDrivers}?isContractor=true`}>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Thêm tài xế
                  </Button>
                </Link>
              </Space>
            ),
          }}
          bordered={true}
          showSorterTooltip={false}
          scroll={{ x: true }}
          tableLayout={"fixed"}
          pagination={{
            showQuickJumper: true,
            pageSize: 50,
          }}
          request={async (params) => {
            const data = filteredDriverList.slice(
              ((params?.current ?? 1) - 1) * (params?.pageSize ?? 10),
              (params?.current ?? 1) * (params?.pageSize ?? 10)
            );
            return {
              data,
              success: true,
              total: filteredDriverList.length,
            } as RequestData<(typeof driverList)[0]>;
          }}
          dataSource={filteredDriverList}
          dateFormatter="string"
          rowKey="id"
          search={false}
          size="small"
        />

        <Divider></Divider>
        <Title level={5}>Danh sách tài xế</Title>

        <ProTable
          columns={columns}
          cardBordered={true}
          cardProps={{
            extra: (
              <Space>
                <Input
                  placeholder="Tìm kiếm tài xế..."
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    handleSearchDriver(value);
                  }}
                  style={{ minWidth: "15%" }}
                />
                <Link to={`${webRoutes.addNewDrivers}?isContractor=true`}>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Thêm tài xế
                  </Button>
                </Link>
              </Space>
            ),
          }}
          bordered={true}
          showSorterTooltip={false}
          scroll={{ x: true }}
          tableLayout={"fixed"}
          pagination={{
            showQuickJumper: true,
            pageSize: 50,
          }}
          request={async (params) => {
            const data = filteredDriverList.slice(
              ((params?.current ?? 1) - 1) * (params?.pageSize ?? 10),
              (params?.current ?? 1) * (params?.pageSize ?? 10)
            );
            return {
              data,
              success: true,
              total: filteredDriverList.length,
            } as RequestData<(typeof driverList)[0]>;
          }}
          dataSource={filteredDriverList}
          dateFormatter="string"
          rowKey="id"
          search={false}
          size="small"
        />
      </div>
    </BasePageContainer>
  );
};

export default ContractorForm;
