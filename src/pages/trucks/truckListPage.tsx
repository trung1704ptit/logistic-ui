import { useEffect, useState } from "react";
import { ProTable, ProColumns, RequestData } from "@ant-design/pro-components";
import { Button, Input, Space, Modal, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { PlusOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { removeVietnameseTones } from "@/lib/utils";
import Title from "antd/lib/typography/Title";
import { ITruck } from "@/interfaces/truck";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import http from "@/lib/http";
import { fetchTrucks } from "@/store/slices/truckSlice";
import { BsFileEarmarkExcel } from "react-icons/bs";

const TruckListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const appDispatch = useDispatch();

  const truckState = useSelector((state: RootState) => state.truck);
  const contractorState = useSelector((state: RootState) => state.contractor);
  const [filteredTruckList, setFilteredTruckList] = useState<ITruck[]>([]);

  const handleEditTruck = (truck: any) => {
    navigate(`${webRoutes.updateTruck}?id=${truck.id}`);
  };

  useEffect(() => {
    if (truckState.trucks) {
      setFilteredTruckList(truckState.trucks);
    }
  }, [truckState]);

  const handleDeleteTruck = (truck: ITruck) => {
    Modal.confirm({
      title: "Xác nhận xóa xe tải",
      content: `Bạn có chắc muốn xóa xe tải?`,
      onOk: async () => {
        try {
          const res = await http.delete(`/trucks/${truck.id}`);
          console.log(res);
          appDispatch(fetchTrucks() as any);
          if (res.status === 204) {
            messageApi.open({
              type: "success",
              content: "Xóa thành công",
            });
          }
        } catch (error) {
          console.error("Error deleting contractor:", error);
          messageApi.open({
            type: "error",
            content: "Có lỗi xảy ra, vui lòng thử lại sau",
          });
        }
      },
    });
  };

  const handleSearchTruck = (searchTerm: string) => {
    const normalizedSearchTerm = removeVietnameseTones(
      searchTerm.toLowerCase()
    );

    const filtered = truckState?.trucks.filter((truck: any) =>
      Object.keys(truck).some((key) =>
        removeVietnameseTones(String(truck[key]))
          .toLowerCase()
          .includes(normalizedSearchTerm)
      )
    );

    setFilteredTruckList(filtered);
  };

  const columns: ProColumns[] = [
    {
      title: "Biển Kiểm Soát",
      dataIndex: "license_plate",
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
      render: (_, row) => `${row.capacity} T`,
    },
    {
      title: "Dài",
      dataIndex: "length",
      sorter: false,
      align: "center",
      render: (_, row) => `${row.length} m`,
    },
    {
      title: "Rộng",
      dataIndex: "width",
      sorter: false,
      align: "center",
      render: (_, row) => `${row.width} m`,
    },
    {
      title: "Cao",
      dataIndex: "height",
      sorter: false,
      align: "center",
      render: (_, row) => `${row.height} m`,
    },
    {
      title: "Thể Tích",
      dataIndex: "volume",
      sorter: false,
      align: "center",
      render: (_, row) => `${row.volume} m³`,
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      sorter: false,
      align: "center",
    },
    {
      title: "Nhà Thầu",
      dataIndex: "contractor_id",
      sorter: false,
      align: "center",
      render: (_, row) => {
        const contractor = contractorState?.contractors?.find(
          (contractor) => contractor.id === row.contractor_id
        );
        return contractor ? contractor.name : undefined;
      },
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
    <BasePageContainer
      breadcrumb={{
        items: [
          {
            key: webRoutes.dashboard,
            title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
          },
          {
            key: webRoutes.trucks,
            title: <Link to={webRoutes.trucks}>Xe tải</Link>,
          },
        ],
      }}
    >
      {contextHolder}
      <ProTable
        columns={columns}
        cardBordered={false}
        options={{
          reload: false,
          density: false,
          setting: false,
        }}
        cardProps={{
          title: <Title level={5}>Danh sách xe tải</Title>,
          extra: (
            <Space>
              <Input
                placeholder="Tìm kiếm xe tải..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  handleSearchTruck(value);
                }}
                style={{ minWidth: "10%" }}
              />
              <Link to={webRoutes.addNewTruck}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm xe tải
                </Button>
              </Link>
              <Button type="dashed" icon={<BsFileEarmarkExcel />}>
                Tải lên danh sách
              </Button>
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
          } as RequestData<(typeof filteredTruckList)[0]>;
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
