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
import { RootState } from "@/store";
import http from "@/lib/http";
import { IClient } from "@/interfaces/client";
import { apiRoutes } from "@/routes/api";
import { fetchClients } from "@/store/slices/clientSlice";

const breadcrumb = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
    {
      key: webRoutes.contractors,
      title: <Link to={webRoutes.contractors}>Nhãn hàng</Link>,
    },
  ],
};

const DriverListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const appDispatch = useDispatch();

  const clients = useSelector((state: RootState) => state.client.clients);
  const [filteredClientList, setFilteredList] = useState<IClient[]>([]);

  const handleEdit = (client: any) => {
    navigate(`${webRoutes.updateClient}?id=${client.id}`);
  };

  useEffect(() => {
    if (clients) {
      setFilteredList(clients);
    }
  }, [clients]);

  const handleDelete = (client: IClient) => {
    Modal.confirm({
      title: "Xác nhận xóa nhãn hàng",
      content: `Bạn có chắc muốn xóa nhãn hàng?`,
      onOk: async () => {
        try {
          const res = await http.delete(`${apiRoutes.clients}/${client.id}`);
          console.log(res);
          appDispatch(fetchClients() as any);
          if (res.status === 204) {
            messageApi.open({
              type: "success",
              content: "Xóa thành công",
            });
          }
        } catch (error) {
          console.error("Error deleting:", error);
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
      title: "Tên nhãn hàng",
      dataIndex: "name",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Số điện thoại",
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
          <Button type="default" onClick={() => handleEdit(row)}>
            Bảng giá
          </Button>
          <Button type="dashed" onClick={() => handleEdit(row)}>
            Sửa
          </Button>
          <Button danger onClick={() => handleDelete(row)}>
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

    const filtered = clients?.filter((driver: any) =>
      Object.keys(driver).some((key) =>
        removeVietnameseTones(String(driver[key]))
          .toLowerCase()
          .includes(normalizedSearchTerm)
      )
    );

    setFilteredList(filtered);
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
          title: <Title level={5}>Nhãn hàng</Title>,
          extra: (
            <Space>
              <Input
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  handleSearch(value);
                }}
                style={{ minWidth: "10%" }}
              />
              <Link to={webRoutes.addNewClient}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm nhãn hàng
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
          pageSize: 20,
        }}
        request={async (params) => {
          const data = filteredClientList?.slice(
            ((params?.current ?? 1) - 1) * (params?.pageSize ?? 10),
            (params?.current ?? 1) * (params?.pageSize ?? 10)
          );
          return {
            data,
            success: true,
            total: filteredClientList?.length || 0,
          } as RequestData<(typeof clients)[0]>;
        }}
        dataSource={filteredClientList}
        dateFormatter="string"
        rowKey="id"
        search={false}
        size="small"
      />
    </BasePageContainer>
  );
};

export default DriverListPage;
