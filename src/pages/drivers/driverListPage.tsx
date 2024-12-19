import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
} from "@ant-design/pro-components";
import { BreadcrumbProps, Button, Modal, Space } from "antd";
import { useRef } from "react";
import { FiUsers } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import BasePageContainer from "@/components/layout/pageContainer";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { driverList } from "@/__mocks__/driver";

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

const DriverListPage = () => {
  const actionRef = useRef<ActionType>();
  const [modal, modalContextHolder] = Modal.useModal();
  const navigate = useNavigate();

  const handleEditDriver = (driver: any) => {
    navigate(`/drivers/edit?id=${driver.id}`);
  };

  const handleDeleteDriver = (driver: any) => {
    Modal.confirm({
      title: "Xác nhận xóa tài xế",
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <p>{`Bạn có chắc muốn xóa tài xế ${driver.name}?`}</p>
          <p>
            Mọi thông tin về tài xế bao gồm thông tin cá nhân, thông tin chuyến
            xe, bảng lương sẽ bị xóa.
          </p>
        </div>
      ),
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        console.log("Deleted driver:", driver);
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

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          title: <FiUsers className="opacity-60" />,
          subTitle: "Tài xế",
          tooltip: {
            className: "opacity-60",
            title: "Danh sách tài xế",
          },
          extra: (
            <Link to={webRoutes.addNewDrivers}>
              <Button type="primary" icon={<PlusOutlined />}>
                Thêm mới tài xế
              </Button>
            </Link>
          ),
        }}
        bordered={true}
        showSorterTooltip={false}
        scroll={{ x: true }}
        tableLayout={"fixed"}
        rowSelection={false}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
        }}
        actionRef={actionRef}
        request={async (params) => {
          if (params.current && params.pageSize) {
            const data = driverList.slice(
              (params?.current - 1) * params?.pageSize,
              params?.current * params?.pageSize
            );
            return {
              data,
              success: true,
              total: driverList.length,
            } as RequestData<(typeof driverList)[0]>;
          }
          return {};
        }}
        dateFormatter="string"
        search={false}
        rowKey="id"
        options={{
          search: false,
        }}
        defaultSize="small" // Chế độ mật độ mặc định là compact
      />
      {modalContextHolder}
    </BasePageContainer>
  );
};

export default DriverListPage;
