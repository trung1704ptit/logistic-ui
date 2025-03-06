import { useEffect, useState } from "react";
import { ProTable, ProColumns } from "@ant-design/pro-components";
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
import UploadDriverAndTruckExcel from "../drivers/uploadDriverAndTruckExcel";
import { apiRoutes } from "@/routes/api";
const TruckListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const appDispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const trucks = useSelector((state: RootState) => state.truck.trucks);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 50 });
  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );
  const [filteredTruckList, setFilteredTruckList] = useState<ITruck[]>([]);

  const handleEditTruck = (truck: any) => {
    navigate(`${webRoutes.updateTruck}?id=${truck.id}`);
  };

  useEffect(() => {
    if (trucks) {
      setFilteredTruckList(trucks);
    }
  }, [trucks]);

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

    const filtered = trucks.filter((truck: any) =>
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
        const contractor = contractors?.find(
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

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const handleDelete = async () => {
    try {
      if (selectedRowKeys.length === 0) {
        message.warning("Vui lòng chọn ít nhất một xe tải để xóa.");
        return;
      }
      message.loading({ content: "Đang xóa...", key: "delete" });

      const res = await http.post(`${apiRoutes.trucks}/delete`, {
        truck_ids: selectedRowKeys,
      });
      if (res && res.data?.data?.deleted_ids?.length > 0) {
        const deletedIds = res.data?.data?.deleted_ids;

        // Update filteredTruckList by removing the deleted trucks
        const updatedTruckList = filteredTruckList.filter(
          (item) => !deletedIds.includes(item.id)
        );
        setFilteredTruckList(updatedTruckList);

        message.success({
          content: `Đã xóa ${selectedRowKeys.length} mục`,
          key: "delete",
        });
        setSelectedRowKeys([]); // Clear selection only after deletion
        await appDispatch(fetchTrucks() as any); // Ensure trucks are refetched before UI updates
      }
    } catch (error) {
      message.error("Lỗi khi xóa xe tải. Vui lòng thử lại.");
      console.error("Delete error:", error);
    }
  };

  const request = async (params: any) => {
    const { current = 1, pageSize = 50 } = params;

    // Calculate paginated data
    const startIndex = (current - 1) * pageSize;
    const endIndex = current * pageSize;

    // Update pagination state
    setPagination({
      current,
      pageSize,
    });

    const paginatedData = filteredTruckList.slice(startIndex, endIndex);

    // Update pagination to reflect the correct total count of filtered data
    return {
      data: paginatedData,
      success: true,
      total: filteredTruckList.length, // Update the total count to reflect the new filtered list length
    };
  };

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
      <UploadDriverAndTruckExcel
        contractors={contractors}
        handleCancel={handleToggleModal}
        openModal={openModal}
      />
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
              <Button
                type="default"
                icon={<BsFileEarmarkExcel />}
                onClick={handleToggleModal}
              >
                Tải lên danh sách
              </Button>
            </Space>
          ),
        }}
        bordered={true}
        showSorterTooltip={false}
        scroll={{ x: true }}
        rowKey="id"
        tableLayout={"fixed"}
        tableAlertOptionRender={({ selectedRowKeys }) => (
          <Button type="primary" danger onClick={handleDelete}>
            Xóa ({selectedRowKeys.length}) mục đã chọn
          </Button>
        )}
        rowSelection={rowSelection}
        pagination={{
          ...pagination,
          total: filteredTruckList.length,
        }}
        request={request}
        dataSource={filteredTruckList}
        dateFormatter="string"
        search={false}
        size="small"
      />
    </BasePageContainer>
  );
};

export default TruckListPage;
