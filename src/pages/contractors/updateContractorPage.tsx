import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Select } from "antd";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space, Divider, Modal, Card } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";

import { ProTable, ProColumns, RequestData } from "@ant-design/pro-components";
import { PlusOutlined } from "@ant-design/icons";
import { driverList, trucks } from "@/__mocks__";
import { removeVietnameseTones } from "@/lib/utils";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { IContractor } from "@/interfaces/contractor";
import http from "@/lib/http";

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

const ContractorForm: React.FC = () => {
  const [form] = Form.useForm();
  const [editingContractor, setEditingContractor] = useState<IContractor>();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const contractorState = useSelector((state: RootState) => state.contractor);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDriverList, setFilteredDriverList] = useState(driverList);

  const [searchTruckTerm, setSearchTruckTerm] = useState("");
  const [filteredTruckList, setFilteredTruckList] = useState(trucks);

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState(false)

  const handleEditTruck = (truck: any) => {
    navigate(`${webRoutes.updateTruck}?id=${truck.id}`);
  };

  const handleDeleteTruck = (truck: any) => {
    Modal.confirm({
      title: "Xác nhận xóa xe tải",
      content: `Bạn có chắc muốn xóa xe tải ${truck.plateNumber}?`,
      onOk: () => {
        console.log("Deleted truck:", truck);
      },
    });
  };

  const columnsTruck: ProColumns[] = [
    {
      title: "Biển Kiểm Soát",
      dataIndex: "plateNumber",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Tải Trọng",
      dataIndex: "capacity",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Kích Thước",
      dataIndex: "dimensions",
      sorter: false,
      align: "center",
    },
    {
      title: "Thể Tích",
      dataIndex: "volume",
      sorter: false,
      align: "center",
    },
    {
      title: "Loại xe",
      dataIndex: "type",
      align: "center",
      render: (_, row) =>
        row.type === "internal"
          ? "Nội bộ"
          : `Nhà thầu: ${row.contractor || "-"}`,
    },
    {
      title: "Ghi Chú",
      dataIndex: "note",
      sorter: false,
      align: "center",
    },
    {
      title: "Hành động",
      align: "center",
      key: "actions",
      render: (_, row) => (
        <Space>
          <Button type="dashed" onClick={() => handleEditTruck(row)}>
            Chi Tiết
          </Button>
          <Button danger onClick={() => handleDeleteTruck(row)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (contractorState.contractors) {
      const contractorId = params.get("id");
      console.log("contractorId", contractorId);
      const contractor = contractorState.contractors.find(
        (item) => item.id === contractorId
      );
      setEditingContractor(contractor);
      form.setFieldsValue(contractor);
    }
  }, [contractorState, params]);

  const handleSearchTruck = (searchTerm: string) => {
    const normalizedSearchTerm = removeVietnameseTones(
      searchTruckTerm.toLowerCase()
    );

    const filtered = trucks.filter((truck: any) =>
      Object.keys(truck).some((key) =>
        removeVietnameseTones(String(truck[key]))
          .toLowerCase()
          .includes(normalizedSearchTerm)
      )
    );

    setFilteredTruckList(filtered);
  };

  const handleSubmit = async (contractor: IContractor) => {
    if (editingContractor) {
      try {
        setIsUpdateLoading(true);
        setIsUpdateError(false);
        const res = await http.put(`/contractors/${editingContractor.id}`, contractor);
        if (res && res.data) {
          navigate(webRoutes.contractors);
        }
      } catch (error) {
        setIsUpdateError(true);
      } finally {
        setIsUpdateLoading(false);
      }
    }
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
      dataIndex: "phone",
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
      title: "Ngày Cấp",
      dataIndex: "issueDate",
      sorter: true,
      align: "center",
    },
    {
      title: "Số bằng lái",
      dataIndex: "licenseNumber",
      sorter: false,
      align: "center",
    },
    {
      title: "Ngày hết hạn bằng lái",
      dataIndex: "licenseExpiry",
      sorter: false,
      align: "center",
    },
    {
      title: "Loại Tài Xế",
      dataIndex: "driverType",
      align: "center",
      render: (_, row) =>
        row.driverType === "internal"
          ? "Nội bộ"
          : `Nhà thầu: ${row.contractor || "Không rõ"}`,
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
      <Card>
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
      </Card>

      <div className="mt-6"></div>

      <ProTable
        columns={columnsTruck}
        cardBordered={true}
        cardProps={{
          title: <Title level={5}>Danh sách xe tải</Title>,
          extra: (
            <Space>
              <Input
                placeholder="Tìm kiếm xe tải..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTruckTerm(value);
                  handleSearchTruck(value);
                }}
                style={{ minWidth: "10%" }}
              />
              <Link to={webRoutes.addNewTruck}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm xe tải
                </Button>
              </Link>
            </Space>
          ),
        }}
        bordered={true}
        showSorterTooltip={false}
        scroll={{ x: true }}
        tableLayout={"fixed"}
        rowSelection={false}
        pagination={{
          showQuickJumper: true,
          pageSize: 20,
        }}
        request={async (params) => {
          const data = filteredTruckList.slice(
            ((params?.current ?? 1) - 1) * (params?.pageSize ?? 10),
            (params?.current ?? 1) * (params?.pageSize ?? 10)
          );
          return {
            data,
            success: true,
            total: filteredTruckList.length,
          } as RequestData<(typeof trucks)[0]>;
        }}
        dataSource={filteredTruckList}
        dateFormatter="string"
        rowKey="id"
        search={false}
        size="small"
      />

      <div className="mt-6"></div>

      <ProTable
        columns={columns}
        cardBordered={true}
        cardProps={{
          title: <Title level={5}>Danh sách tài xế</Title>,
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
    </BasePageContainer>
  );
};

export default ContractorForm;
