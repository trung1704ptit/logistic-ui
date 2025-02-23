import { useEffect, useState } from "react";
import { ProTable, ProColumns, RequestData } from "@ant-design/pro-components";
import { Button, Input, Space, Modal, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { PlusOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { removeVietnameseTones } from "@/lib/utils";
import Title from "antd/lib/typography/Title";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { IContractor } from "@/interfaces/contractor";
import http from "@/lib/http";
import { fetchContractors } from "@/store/slices/contractorSlice";

const breadcrumb = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
    {
      key: webRoutes.contractors,
      title: <Link to={webRoutes.contractors}>Nhà thầu</Link>,
    },
  ],
};

const DriverListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const contractors = useSelector((state: RootState) => state.contractor.contractors);
  const [messageApi, contextHolder] = message.useMessage();
  const [filteredContractorList, setFilteredContractorList] =
    useState<IContractor[]>();

  const dispatch = useDispatch<AppDispatch>();

  // Handle contractor edit
  const handleEditContractor = (contractor: IContractor) => {
    navigate(`${webRoutes.updateContractors}?id=${contractor.id}`);
  };

  // Handle contractor deletion
  const handleDeleteContractor = (contractor: any) => {
    Modal.confirm({
      title: "Xác nhận xóa nhà thầu",
      content: `Bạn có chắc muốn xóa nhà thầu ${contractor.name}?`,
      onOk: async () => {
        try {
          const res = await http.delete(`/contractors/${contractor.id}`);

          if (res.status === 204) {
            dispatch(fetchContractors());
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

  useEffect(() => {
    if (contractors) {
      setFilteredContractorList(contractors);
    }
  }, [contractors]);

  const handleViewContractorPrices = (contractor: IContractor) => {
    navigate(`${webRoutes.prices}?owner_id=${contractor.id}&owner_type=contractor`)
  }

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
      dataIndex: "phone",
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
          <Button type="dashed" onClick={() => handleViewContractorPrices(row)} size="small">
            Bảng giá
          </Button>
          <Button type="dashed" onClick={() => handleEditContractor(row)} size="small">
            Chi Tiết
          </Button>
          <Button danger onClick={() => handleDeleteContractor(row)} size="small">
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // Example search function
  const handleSearch = (searchTerm: string) => {
    const normalizedSearchTerm = removeVietnameseTones(
      searchTerm.toLowerCase()
    );

    const filtered = contractors?.filter((driver: any) =>
      Object.keys(driver).some((key) =>
        removeVietnameseTones(String(driver[key]))
          .toLowerCase()
          .includes(normalizedSearchTerm)
      )
    );

    setFilteredContractorList(filtered);
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
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
                style={{ minWidth: "10%" }}
              />
              <Link to={webRoutes.addNewContractors}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm nhà thầu
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
          pageSize: 200,
        }}
        request={async (params) => {
          const data = filteredContractorList?.slice(
            ((params?.current ?? 1) - 1) * (params?.pageSize ?? 10),
            (params?.current ?? 1) * (params?.pageSize ?? 10)
          );
          return {
            data,
            success: true,
            total: filteredContractorList?.length || 0,
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
