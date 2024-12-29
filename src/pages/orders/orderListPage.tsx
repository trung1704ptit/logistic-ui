import React, { useState } from "react";
import { ProTable, ProColumns, RequestData } from "@ant-design/pro-components";
import { Button, Input, Space, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { PlusOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { removeVietnameseTones } from "@/lib/utils";
import Title from "antd/lib/typography/Title";

// Fake data for trucks
const trucks = [
  {
    id: "truck1",
    plateNumber: "79C-12345",
    capacity: "15 tấn",
    dimensions: "6m x 2.5m x 2.5m",
    volume: "37.5 m³",
    type: "Nội bộ",
    contractor: "",
    note: "Xe mới bảo dưỡng."
  },
  {
    id: "truck2",
    plateNumber: "81C-67890",
    capacity: "10 tấn",
    dimensions: "5m x 2.5m x 2m",
    volume: "25 m³",
    type: "Nhà thầu",
    contractor: "Nhà thầu A",
    note: "Sử dụng cho dự án X."
  },
  {
    id: "truck3",
    plateNumber: "72C-11223",
    capacity: "20 tấn",
    dimensions: "7m x 3m x 3m",
    volume: "63 m³",
    type: "Nội bộ",
    contractor: "",
    note: "Chỉ sử dụng trong nội bộ."
  }
];

const TruckListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [filteredTruckList, setFilteredTruckList] = useState(trucks);

  const handleEditTruck = (truck: any) => {
    navigate(`${webRoutes.updateTruck}?id=${truck.id}`);
  };

  const handleDeleteTruck = (truck: any) => {
    Modal.confirm({
      title: "Xác nhận xóa đơn hàng",
      content: `Bạn có chắc muốn xóa đơn hàng ${truck.plateNumber}?`,
      onOk: () => {
        console.log("Deleted truck:", truck);
      },
    });
  };

  const handleSearchTruck = (searchTerm: string) => {
    const normalizedSearchTerm = removeVietnameseTones(searchTerm.toLowerCase());

    const filtered = trucks.filter((truck: any) =>
      Object.keys(truck).some((key) =>
        removeVietnameseTones(String(truck[key])).toLowerCase().includes(normalizedSearchTerm)
      )
    );

    setFilteredTruckList(filtered);
  };

  const columns: ProColumns[] = [
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
      title: "Loại Xe",
      dataIndex: "type",
      sorter: false,
      align: "center",
    },
    {
      title: "Nhà Thầu",
      dataIndex: "contractor",
      sorter: false,
      align: "center",
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
            Xem Chi Tiết
          </Button>
          <Button danger onClick={() => handleDeleteTruck(row)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <BasePageContainer breadcrumb={{
      items: [
        { key: webRoutes.dashboard, title: <Link to={webRoutes.dashboard}>Trang chủ</Link> },
        { key: webRoutes.trucks, title: <Link to={webRoutes.trucks}>đơn hàng</Link> },
      ],
    }}>
      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          title: <Title level={5}>Danh sách đơn hàng</Title>,
          extra: (
            <Space>
              <Input
                placeholder="Tìm kiếm đơn hàng..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  handleSearchTruck(value);
                }}
                style={{ minWidth: '10%' }}
              />
              <Link to={webRoutes.addNewOrder}>
                <Button type="primary" icon={<PlusOutlined />}>Thêm đơn hàng</Button>
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
          pageSize: 30,
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
          } as RequestData<typeof trucks[0]>;
        }}
        dataSource={filteredTruckList}
        dateFormatter="string"
        rowKey="id"
        search={false}
        size="small"
      />
    </BasePageContainer>
  );
};

export default TruckListPage;
