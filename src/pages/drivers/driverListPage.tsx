import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
} from "@ant-design/pro-components";
import { BreadcrumbProps, Button, Modal, Space } from "antd";
import { useRef } from "react";
import { FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import BasePageContainer from "@/components/layout/pageContainer";
import {
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

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

const driverList = [
  {
    id: "1",
    avatar: null,
    name: "Nguyễn Văn A",
    phoneNumber: "0123456789",
    idCard: "123456789",
    issueDate: "2021-01-01",
    birthDate: "1990-01-01",
    hometown: "Hà Nội",
    licenseNumber: "A123456",
    licenseExpiry: "2025-01-01",
    driverType: "Nội bộ",
    contractor: null,
  },
  {
    id: "2",
    avatar: null,
    name: "Trần Thị B",
    phoneNumber: "0987654321",
    idCard: "987654321",
    issueDate: "2022-02-02",
    birthDate: "1992-02-02",
    hometown: "Hải Phòng",
    licenseNumber: "B987654",
    licenseExpiry: "2026-02-02",
    driverType: "Nhà thầu",
    contractor: "Nhà thầu A",
  },
  {
    id: "3",
    avatar: null,
    name: "Lê Văn C",
    phoneNumber: "0123987654",
    idCard: "456789123",
    issueDate: "2023-03-03",
    birthDate: "1993-03-03",
    hometown: "Đà Nẵng",
    licenseNumber: "C456789",
    licenseExpiry: "2027-03-03",
    driverType: "Nội bộ",
    contractor: null,
  },
];

const DriverListPage = () => {
  const actionRef = useRef<ActionType>();
  const [modal, modalContextHolder] = Modal.useModal();
  const handleEditDriver = (driver: any) => {
    // Logic điều hướng đến trang sửa thông tin
    console.log("Edit driver:", driver);
    // Điều hướng đến trang sửa:
    // navigate(`/drivers/edit/${driver.id}`);
  };

  const handleDeleteDriver = (driver: any) => {
    Modal.confirm({
      title: "Xác nhận xóa tài xế",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc muốn xóa tài xế ${driver.name}?`,
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        // Logic xóa tài xế
        console.log("Deleted driver:", driver);
        // Ví dụ gọi API xóa:
        // deleteDriver(driver.id)
        //   .then(() => {
        //     actionRef.current?.reload();
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //   });
      },
    });
  };

  const columns: ProColumns[] = [
    {
      title: "Họ và Tên",
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
        row.driverType === "Nội bộ"
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
