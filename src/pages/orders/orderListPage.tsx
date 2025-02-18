import { useEffect, useState } from "react";
import { ProTable, ProColumns, RequestData } from "@ant-design/pro-components";
import { Button, Input, Space, Modal, message, Select } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { PlusOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { removeVietnameseTones } from "@/lib/utils";
import http from "@/lib/http";
import { apiRoutes } from "@/routes/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import moment from "moment";
import OrderDetails from "./orderDetails";
import { IOrder } from "@/interfaces/order";

const TruckListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState<IOrder>();
  const d = new Date();
  const [searchParams, setSearchParams] = useSearchParams();
  const drivers = useSelector((state: RootState) => state.driver.drivers);
  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );

  const handleDeleteOrder = (order: any) => {
    Modal.confirm({
      title: "Xác nhận xóa đơn hàng",
      content: "Bạn có chắc muốn xóa đơn hàng?",
      onOk: async () => {
        try {
          const res = await http.delete(`${apiRoutes.orders}/${order.id}`);
          if (res.status === 204) {
            message.success("Xóa đơn hàng thành công");
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

  useEffect(() => {
    const month = searchParams.get("month");
    const year = searchParams.get("year");
    if (!year && !month) {
      searchParams.set("month", (d.getMonth() + 1).toString());
      searchParams.set("year", d.getFullYear().toString());
      searchParams.set("driver_id", "all");
      searchParams.set("contractor_id", "all");
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const driverId = searchParams.get("driver_id");
      const contractorId = searchParams.get("contractor_id");
      const month = searchParams.get("month");
      const year = searchParams.get("year");
      const res = await http.get(
        `${apiRoutes.orders}?year=${year}&month=${month}&contractor_id=${contractorId}&driver_id=${driverId}`
      );
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

  const handleChangeFilter = (type: string, val: any) => {
    searchParams.set(type, val.toString());

    setSearchParams(searchParams);
  };

  useEffect(() => {
    fetchOrders();
  }, [searchParams]);

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
      title: "Nhà thầu",
      dataIndex: "contractor_id",
      sorter: false,
      align: "center",
      render: (_, row) => <>{row?.contractor?.name}</>,
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
      title: "Xe tải",
      dataIndex: "truck_id",
      sorter: false,
      align: "center",
      render: (_, row) => (
        <>
          {row?.truck?.license_plate && (
            <>
              {row?.truck?.license_plate} - {row?.truck?.capacity}T
            </>
          )}
        </>
      ),
    },
    {
      title: "Nhãn hàng",
      dataIndex: "client_id",
      sorter: false,
      align: "center",
      render: (_, row) => <span>{row.client.name}</span>,
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
      title: "Tổng Cước",
      dataIndex: "total_salary",
      sorter: false,
      align: "center",
      render: (_, row) => row.total_salary.toLocaleString(),
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
        loading={isLoading}
        cardProps={{
          title: (
            <div className="mb-3">
              <h4>Danh sách đơn hàng</h4>
              <Space>
                <Select
                  placeholder="Tháng"
                  className="w-[100px]"
                  value={parseInt(searchParams.get("month") as string)}
                  onChange={(val) => handleChangeFilter("month", val)}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <Select.Option key={i + 1} value={i + 1}>
                      Tháng {i + 1}
                    </Select.Option>
                  ))}
                </Select>
                <Select
                  placeholder="Năm"
                  className="w-[100px]"
                  value={searchParams.get("year")}
                  onChange={(val) => handleChangeFilter("year", val)}
                >
                  {Array.from({ length: 5 }, (_, i) => {
                    const year = d.getFullYear() - i;
                    return (
                      <Select.Option key={year} value={year}>
                        {year}
                      </Select.Option>
                    );
                  })}
                </Select>
                <Select
                  placeholder="Nhà thầu"
                  className="w-[180px]"
                  value={searchParams.get("contractor_id")}
                  onChange={(val) => handleChangeFilter("contractor_id", val)}
                >
                  <Select.Option key={"all"} value="all">
                    Tất cả
                  </Select.Option>
                  {contractors.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>

                <Select
                  placeholder="Tài xế"
                  className="w-[180px]"
                  value={searchParams.get("driver_id")}
                  onChange={(val) => handleChangeFilter("driver_id", val)}
                >
                  <Select.Option key={"all"} value="all">
                    Tất cả
                  </Select.Option>
                  {drivers.map((driver) => (
                    <Select.Option key={driver.id} value={driver.id}>
                      {driver.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Space>
            </div>
          ),
          extra: (
            <Space className="mb-3">
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
        options={{
          reload: false,
          density: false,
          setting: false,
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
