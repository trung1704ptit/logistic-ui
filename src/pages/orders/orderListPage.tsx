import React, { useEffect, useState } from "react";
import { ProTable, ProColumns, RequestData } from "@ant-design/pro-components";
import { Button, Input, Space, Modal, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { PlusOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { removeVietnameseTones } from "@/lib/utils";
import Title from "antd/lib/typography/Title";
import http from "@/lib/http";
import { apiRoutes } from "@/routes/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import moment from "moment";
import OrderDetails from "./orderDetails";
import { IOrder } from "@/interfaces/order";

const TruckListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState<IOrder>();
  // const trucks = useSelector((state: RootState) => state.truck.trucks);
  // const contractors = useSelector(
  //   (state: RootState) => state.contractor.contractors
  // );
  // const drivers = useSelector((state: RootState) => state.driver.drivers);

  const handleViewOrder = (order: any) => {
    navigate(`${webRoutes.updateTruck}?id=${order.id}`);
  };

  const handleDeleteOrder = (order: any) => {
    Modal.confirm({
      title: "Xác nhận xóa đơn hàng",
      content: 'Bạn có chắc muốn xóa đơn hàng?',
      onOk: async () => {
        try {
          const res = await http.delete(`${apiRoutes.orders}/${order.id}`);
          if (res.status === 204) {
            message.success("Xóa thành công");
            fetchOrders();
          }
        } catch (error) {
          console.error("Error deleting contractor:", error);
          message.error("Có lỗi xảy ra, vui lòng thử lại sau");
        }
      },
    });
  };

  const handleSearch = (searchTerm: string) => {
    const normalizedSearchTerm = removeVietnameseTones(
      searchTerm.toLowerCase()
    );

    const filtered = data.filter((truck: any) =>
      Object.keys(truck).some((key) =>
        removeVietnameseTones(String(truck[key]))
          .toLowerCase()
          .includes(normalizedSearchTerm)
      )
    );

    setFilteredData(filtered);
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const res = await http.get(apiRoutes.orders);
      if (res && res.data) {
        console.log(res.data.data);
        setData(res.data.data);
        setFilteredData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns: ProColumns[] = [
    {
      title: "Thời gian",
      dataIndex: "order_time",
      sorter: false,
      align: "center",
      ellipsis: true,
      render: (_, row) => <>{moment(row?.order_time).format("DD-MM-YYYY")}</>,
    },
    {
      title: "Tài xế",
      dataIndex: "driver_id",
      sorter: false,
      align: "center",
      ellipsis: true,
      render: (_, row) => <>{row?.driver?.full_name}</>,
    },
    {
      title: "Nhà thầu",
      dataIndex: "contractor_id",
      sorter: false,
      align: "center",
      render: (_, row) => <>{row?.contractor?.name}</>,
    },
    {
      title: "Xe tải",
      dataIndex: "truck_id",
      sorter: false,
      align: "center",
      render: (_, row) => (
        <>
          {row?.truck?.license_plate} - {row?.truck?.capacity}T
        </>
      ),
    },
    {
      title: "Nhãn hàng",
      dataIndex: "company_name",
      sorter: false,
      align: "center",
    },
    {
      title: "Điểm lấy",
      dataIndex: "pickup_province",
      sorter: false,
      align: "center",
    },
    {
      title: "Điểm giao",
      dataIndex: "delivery_province",
      sorter: false,
      align: "center",
    },
    {
      title: "Tổng lương",
      dataIndex: "total_salary",
      sorter: false,
      align: "center",
    },
    {
      title: "Hành động",
      align: "center",
      key: "actions",
      render: (_, row) => (
        <Space>
          <Button type="dashed" onClick={() => setOrderDetail(row)}>
            Chi tiết
          </Button>
          <Button danger onClick={() => handleDeleteOrder(row)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <BasePageContainer
      breadcrumb={{
        items: [
          {
            key: webRoutes.dashboard,
            title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
          },
          {
            key: webRoutes.orders,
            title: <Link to={webRoutes.orders}>Đơn hàng</Link>,
          },
        ],
      }}
    >
      {orderDetail && (
        <OrderDetails
          data={orderDetail}
          isReadOnly={true}
          onClose={() => setOrderDetail(undefined)}
        />
      )}
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
                  handleSearch(value);
                }}
                style={{ minWidth: "10%" }}
              />
              <Link to={webRoutes.addNewOrder}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm đơn hàng
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
          pageSize: 30,
        }}
        request={async (params) => {
          const data = filteredData.slice(
            ((params?.current ?? 1) - 1) * (params?.pageSize ?? 10),
            (params?.current ?? 1) * (params?.pageSize ?? 10)
          );
          return {
            data,
            success: true,
            total: filteredData.length,
          } as RequestData<(typeof data)[0]>;
        }}
        dataSource={filteredData}
        dateFormatter="string"
        rowKey="id"
        search={false}
        size="small"
      />
    </BasePageContainer>
  );
};

export default TruckListPage;
