import React, { useState } from "react";
import { ProTable, ProColumns, RequestData } from "@ant-design/pro-components";
import { Button, Input, Space, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { PlusOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { contractors } from "@/__mocks__";
import { removeVietnameseTones } from "@/lib/utils";
import Title from "antd/lib/typography/Title";

const breadcrumb = {
  items: [
    { key: webRoutes.dashboard, title: <Link to={webRoutes.dashboard}>Trang chủ</Link> },
    { key: webRoutes.contractors, title: <Link to={webRoutes.contractors}>Nhà thầu</Link> },
  ],
};

const DriverListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [filteredContractorList, setFilteredContractorList] = useState(contractors);

  // Handle driver edit
  const handleEditDriver = (driver: any) => {
    navigate(`${webRoutes.updateContractors}?id=${driver.id}`);
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
      title: "Tên nhà thầu",
      dataIndex: "name",
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
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: false,
      align: "center",
    },
    {
      title: "Ghi chú",
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
          <Button type="dashed" onClick={() => handleEditDriver(row)}>
            Xem Chi Tiết
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

  const filtered = contractors.filter((driver: any) =>
    Object.keys(driver).some((key) =>
      removeVietnameseTones(String(driver[key])).toLowerCase().includes(normalizedSearchTerm)
    )
  );

  setFilteredContractorList(filtered);
};
  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          title: <Title level={5}>Nhà thầu</Title>,
          extra: (
            <Space>
              <Input
                placeholder="Tìm kiếm nhà thầu..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  handleSearch(value);
                }}
                style={{ width: 300 }}
              />
              <Link to={webRoutes.addNewContractors}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm mới nhà thầu
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
          const data = filteredContractorList.slice(
            ((params?.current ?? 1) - 1) * (params?.pageSize ?? 10),
            (params?.current ?? 1) * (params?.pageSize ?? 10)
          );
          return {
            data,
            success: true,
            total: filteredContractorList.length,
          } as RequestData<(typeof contractors)[0]>;
        }}
        dataSource={filteredContractorList}
        dateFormatter="string"
        rowKey="id"
        search={false}
        size="small"
      />
    </BasePageContainer>
  );
};

export default DriverListPage;
