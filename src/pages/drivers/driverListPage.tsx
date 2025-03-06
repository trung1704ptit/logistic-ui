import { useState, useEffect } from "react";
import { ProTable, ProColumns, RequestData } from "@ant-design/pro-components";
import { Button, Input, Space, Modal, message, Upload } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { PlusOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { removeVietnameseTones } from "@/lib/utils";
import { fetchDrivers } from "@/store/slices/driverSlice";
import moment from "moment";
import http from "@/lib/http";
import { IDriver } from "@/interfaces/driver";
import { BreadcrumbProps } from "antd";
import Title from "antd/lib/typography/Title";
import { BsFileEarmarkExcel } from "react-icons/bs";
import UploadDriverAndTruckExcel from "./uploadDriverAndTruckExcel";
import { apiRoutes } from "@/routes/api";

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
    {
      key: webRoutes.drivers,
      title: <Link to={webRoutes.drivers}>Tài xế</Link>,
    },
  ],
};

// Driver List Page Component
const DriverListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 50 });
  // Access drivers from Redux store
  const drivers = useSelector((state: RootState) => state.driver.drivers);

  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );

  const [filteredDriverList, setFilteredDriverList] = useState<IDriver[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setFilteredDriverList(drivers);
  }, [drivers]);

  const handleEditDriver = (driver: IDriver) => {
    navigate(`${webRoutes.updateDrivers}?id=${driver.id}`);
  };

  const handleDeleteDriver = (driver: IDriver) => {
    Modal.confirm({
      title: "Xác nhận xóa tài xế",
      content: `Bạn có chắc muốn xóa tài xế ${driver.full_name}?`,
      onOk: async () => {
        try {
          const res = await http.delete(`/drivers/${driver.id}`);

          if (res.status === 204) {
            dispatch(fetchDrivers());
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

  const columns: ProColumns[] = [
    {
      title: "Họ và Tên",
      dataIndex: "full_name",
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
      dataIndex: "cccd",
      sorter: false,
      align: "center",
    },
    {
      title: "Ngày Sinh",
      dataIndex: "date_of_birth", // Date string 'YYYY-MM-DD'
      sorter: false,
      align: "center",
      render: (_, row) => moment(row.date_of_birth).format("DD-MM-YYYY"), // Render the string directly
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      sorter: false,
      align: "center",
    },
    {
      title: "Số Bằng Lái",
      dataIndex: "license_number",
      sorter: false,
      align: "center",
    },
    {
      title: "Ngày Hết Hạn Bằng Lái",
      dataIndex: "license_expiry", // Date string 'YYYY-MM-DD'
      sorter: false,
      align: "center",
      render: (_, row) => moment(row.license_expiry).format("DD-MM-YYYY"), // Render the string directly
    },
    {
      title: "Nhà thầu",
      dataIndex: "contractor_id",
      align: "center",
      render: (_, row) => {
        const contractor = contractors?.find(
          (contractor) => contractor.id === row.contractor_id
        );
        return contractor ? contractor.name : undefined;
      },
    },
    {
      title: "Lương cứng",
      dataIndex: "fixed_salary",
      sorter: true,
      align: "center",
      render: (_, row) => <>{row?.fixed_salary?.toLocaleString()}</>
    },
    {
      title: "Ghi Chú",
      dataIndex: "note",
      align: "center",
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

  // Search functionality
  const handleSearch = (searchTerm: string) => {
    const normalizedSearchTerm = removeVietnameseTones(
      searchTerm.toLowerCase()
    );

    const filtered = drivers.filter((driver: any) =>
      Object.keys(driver).some((key) =>
        removeVietnameseTones(String(driver[key]))
          .toLowerCase()
          .includes(normalizedSearchTerm)
      )
    );

    setFilteredDriverList(filtered);
  };

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

      const res = await http.post(`${apiRoutes.drivers}/delete`, {
        driver_ids: selectedRowKeys,
      });
      if (res && res.data?.data?.deleted_ids?.length > 0) {
        const deletedIds = res.data?.data?.deleted_ids;

        // Update filteredDriverList by removing the deleted drivers
        const updatedDriverList = filteredDriverList.filter(
          (item) => !deletedIds.includes(item.id)
        );
        setFilteredDriverList(updatedDriverList);

        message.success({
          content: `Đã xóa ${selectedRowKeys.length} mục`,
          key: "delete",
        });
        setSelectedRowKeys([]); // Clear selection only after deletion
        await dispatch(fetchDrivers() as any); // Ensure drivers are refetched before UI updates
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

    const paginatedData = filteredDriverList.slice(startIndex, endIndex);

    // Update pagination to reflect the correct total count of filtered data
    return {
      data: paginatedData,
      success: true,
      total: filteredDriverList.length, // Update the total count to reflect the new filtered list length
    };
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      {contextHolder}
      <UploadDriverAndTruckExcel
        contractors={contractors}
        handleCancel={handleToggleModal}
        openModal={openModal}
      />

      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          title: <Title level={5}>Danh sách tài xế</Title>,
          extra: (
            <Space>
              <Input
                placeholder="Tìm kiếm tài xế..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  handleSearch(value);
                }}
                style={{ minWidth: "10%" }}
              />
              <Link to={webRoutes.addNewDrivers}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm tài xế
                </Button>
              </Link>

              <Button
                type="default"
                icon={<BsFileEarmarkExcel />}
                onClick={handleToggleModal}
              >
                Tải lên tài xế
              </Button>
            </Space>
          ),
        }}
        bordered={true}
        scroll={{ x: true }}
        tableAlertOptionRender={({ selectedRowKeys }) => (
          <Button type="primary" danger onClick={handleDelete}>
            Xóa ({selectedRowKeys.length}) mục đã chọn
          </Button>
        )}
        rowSelection={rowSelection}
        pagination={{
          ...pagination,
          total: filteredDriverList.length,
        }}
        request={request}
        options={{
          reload: false,
          density: false,
          setting: false,
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
