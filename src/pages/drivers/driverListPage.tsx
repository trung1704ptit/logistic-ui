import React, { useState } from "react";
import { ProTable, ProColumns, RequestData } from "@ant-design/pro-components";
import { Button, Input, Space, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { FiUsers } from "react-icons/fi";
import { PlusOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { driverList } from "@/__mocks__/driver";
import { removeVietnameseTones } from "@/lib/utils";

// Breadcrumb for navigation
const breadcrumb = {
  items: [
    { key: webRoutes.dashboard, title: <Link to={webRoutes.dashboard}>Trang chủ</Link> },
    { key: webRoutes.drivers, title: <Link to={webRoutes.drivers}>Tài xế</Link> },
  ],
};

const DriverListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [filteredDriverList, setFilteredDriverList] = useState(driverList);

  // Handle driver edit
  const handleEditDriver = (driver: any) => {
    navigate(`/drivers/edit?id=${driver.id}`);
  };

  // Handle driver deletion
  const handleDeleteDriver = (driver: any) => {
    Modal.confirm({
      title: "Xác nhận xóa tài xế",
      content: `Bạn có chắc muốn xóa tài xế ${driver.name}?`,
      onOk: () => {
        console.log("Deleted driver:", driver);
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
            Sửa
          </Button>
          <Button danger onClick={() => handleDeleteDriver(row)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

// Example search function
const handleSearch = (searchTerm: string) => {
  const normalizedSearchTerm = removeVietnameseTones(searchTerm.toLowerCase());

  const filtered = driverList.filter((driver: any) =>
    Object.keys(driver).some((key) =>
      removeVietnameseTones(String(driver[key])).toLowerCase().includes(normalizedSearchTerm)
    )
  );

  setFilteredDriverList(filtered);
};
  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          title: <FiUsers className="opacity-60" />,
          subTitle: "Tài xế",
          extra: (
            <Space>
              <Input
                placeholder="Tìm kiếm tài xế..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  handleSearch(value); // Call handleSearch whenever the input changes
                }}
                style={{ width: 300 }}
              />
              <Link to={webRoutes.addNewDrivers}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm mới tài xế
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

export default DriverListPage;
