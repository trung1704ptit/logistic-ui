import { useState, useEffect } from "react";
import { ProTable, ProColumns } from "@ant-design/pro-components";
import { Button, Input, Space, Modal, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { removeVietnameseTones } from "@/lib/utils";
import { fetchDrivers } from "@/store/slices/driverSlice";
import moment from "moment";
import http from "@/lib/http";
import { IDriver } from "@/interfaces/driver";
import Title from "antd/lib/typography/Title";
import { BsFileEarmarkExcel } from "react-icons/bs";
import UploadDriverAndTruckExcel from "@/components/uploadDriverAndTruckExcel";
import { apiRoutes } from "@/routes/api";
import { INVALID_DATE } from "@/constants";
import { fetchContractors } from "@/store/slices/contractorSlice";
import { debounce } from "lodash";

interface IProps {
  drivers: IDriver[];
  contractorId?: string | null;
}

const DriverList = ({ drivers, contractorId }: IProps) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );
  const [filteredDataList, setFilteredDataList] = useState<IDriver[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setFilteredDataList(drivers);
  }, [drivers]);

  const handleEditDriver = (driver: IDriver) => {
    navigate(`${webRoutes.updateDrivers}?id=${driver.id}`);
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
      dataIndex: "date_of_birth",
      sorter: false,
      align: "center",
      render: (_, row) =>
        (!row?.date_of_birth?.includes(INVALID_DATE) &&
          moment(row.date_of_birth).format("DD-MM-YYYY")) ||
        "-",
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
      dataIndex: "license_expiry",
      sorter: false,
      align: "center",
      render: (_, row) =>
        (row.license_expiry &&
          !row.license_expiry.includes(INVALID_DATE) &&
          moment(row.license_expiry).format("DD-MM-YYYY")) ||
        "-",
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
      render: (_, row) => <>{row?.fixed_salary?.toLocaleString()}</>,
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
          <Button
            type="dashed"
            onClick={() => handleEditDriver(row)}
            size="small"
          >
            Sửa
          </Button>
          <Button danger onClick={() => handleDeleteDriver(row)} size="small">
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // Search functionality
  const handleSearch = debounce((searchTerm: string) => {
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

    setFilteredDataList(filtered);
  }, 400);

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const handleDeleteDriver = (driver: IDriver) => {
    Modal.confirm({
      title: "Xác nhận xóa tài xế",
      content: `Bạn có chắc muốn xóa tài xế ${driver.full_name}?`,
      onOk: async () => {
        try {
          const res = await http.delete(`${apiRoutes.drivers}/${driver.id}`);

          if (res.status === 204) {
            dispatch(fetchDrivers());
            dispatch(fetchContractors());
            message.success("Xóa thành công");
          }
        } catch (error) {
          console.error("Error deleting contractor:", error);
          message.error("Có lỗi xảy ra, vui lòng thử lại sau");
        }
      },
    });
  };

  const handleDelete = async () => {
    try {
      if (selectedRowKeys.length === 0) {
        message.warning("Vui lòng chọn ít nhất một xe tải để xóa.");
        return;
      }

      Modal.confirm({
        title: "Xác nhận xóa",
        content: `Bạn có chắc muốn xóa ${selectedRowKeys.length} mục không?`,
        onOk: async () => {
          try {
            const res = await http.post(`${apiRoutes.drivers}/delete`, {
              driver_ids: selectedRowKeys,
            });
            if (res && res.data?.data?.deleted_ids?.length > 0) {
              const deletedIds = res.data?.data?.deleted_ids;

              const updatedDriverList = filteredDataList.filter(
                (item) => !deletedIds.includes(item.id)
              );
              setFilteredDataList(updatedDriverList);
              dispatch(fetchDrivers());
              dispatch(fetchContractors());
              message.success({
                content: `Đã xóa ${selectedRowKeys.length} mục`,
                key: "delete",
              });
              setSelectedRowKeys([]);
              await dispatch(fetchDrivers() as any);
            }
          } catch (error) {
            message.error("Đã có lỗi xảy ra khi xóa.");
          }
        },
      });
    } catch (error) {
      message.error("Lỗi khi xóa xe tải. Vui lòng thử lại.");
      console.error("Delete error:", error);
    }
  };

  return (
    <div id="driver-list">
      <UploadDriverAndTruckExcel
        contractors={contractors}
        handleCancel={handleToggleModal}
        openModal={openModal}
        contractorId={contractorId}
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
                onChange={(e) => {
                  const value = e.target.value;
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
        rowKey="id"
        rowSelection={rowSelection}
        dataSource={filteredDataList}
        pagination={{
          pageSize: 50,
        }}
        options={{
          reload: false,
          density: false,
          setting: false,
        }}
        dateFormatter="string"
        search={false}
        size="small"
      />
    </div>
  );
};

export default DriverList;
