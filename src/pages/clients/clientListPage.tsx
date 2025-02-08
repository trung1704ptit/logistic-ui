import { useEffect, useState } from "react";
import { ProTable, ProColumns, RequestData } from "@ant-design/pro-components";
import { Button, Input, Space, Modal, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { PlusOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { removeVietnameseTones } from "@/lib/utils";
import Title from "antd/lib/typography/Title";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import http from "@/lib/http";
import { IClient } from "@/interfaces/client";
import { apiRoutes } from "@/routes/api";
import { fetchClients } from "@/store/slices/clientSlice";

const TruckListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const appDispatch = useDispatch();

  const clients = useSelector((state: RootState) => state.client.clients);
  const [filteredClientList, setFilteredList] = useState<IClient[]>([]);

  const handleEdit = (client: any) => {
    navigate(`${webRoutes.updateTruck}?id=${client.id}`);
  };

  useEffect(() => {
    if (clients) {
      setFilteredList(clients);
    }
  }, [clients]);

  const handleDelete = (client: IClient) => {
    Modal.confirm({
      title: "Xác nhận xóa xe tải",
      content: `Bạn có chắc muốn xóa xe tải?`,
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
          console.error("Error deleting contractor:", error);
          messageApi.open({
            type: "error",
            content: "Có lỗi xảy ra, vui lòng thử lại sau",
          });
        }
      },
    });
  };

  const handleSearch = (searchTerm: string) => {
    const normalizedSearchTerm = removeVietnameseTones(
      searchTerm.toLowerCase()
    );

    const filtered = clients.filter((client: any) =>
      Object.keys(client).some((key) =>
        removeVietnameseTones(String(client[key]))
          .toLowerCase()
          .includes(normalizedSearchTerm)
      )
    );

    setFilteredList(filtered);
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
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      sorter: false,
      align: "center",
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
          <Button type="dashed" onClick={() => handleEdit(row)}>
            Xem Chi Tiết
          </Button>
          <Button danger onClick={() => handleDelete(row)}>
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
            key: webRoutes.clients,
            title: <Link to={webRoutes.clients}>Nhãn hàng</Link>,
          },
        ],
      }}
    >
      {contextHolder}
      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          title: <Title level={5}>Danh sách nhãn hàng</Title>,
          extra: (
            <Space>
              <Input
                placeholder="Tìm kiếm nhãn hàng..."
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
          const data = filteredClientList.slice(
            ((params?.current ?? 1) - 1) * (params?.pageSize ?? 10),
            (params?.current ?? 1) * (params?.pageSize ?? 10)
          );
          return {
            data,
            success: true,
            total: filteredClientList.length,
          } as RequestData<(typeof filteredClientList)[0]>;
        }}
        options={{
          reload: false,
          density: false,
          setting: false,
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

export default TruckListPage;
