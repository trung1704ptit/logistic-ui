import { useEffect, useState } from "react";
import { ProTable, ProColumns, RequestData } from "@ant-design/pro-components";
import { Button, Input, Space, Modal, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { PlusOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { removeVietnameseTones } from "@/lib/utils";
import Title from "antd/lib/typography/Title";
import http from "@/lib/http";
import { apiRoutes } from "@/routes/api";
import { IUser } from "@/interfaces/user";
import moment from "moment";

const UserListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [users, setUsers] = useState<IUser[]>([]);

  const [filteredUserList, setFilteredUserList] = useState<IUser[]>([]);

  const handleEdit = (user: any, option: string) => {
    navigate(`${webRoutes.updateUser}?id=${user.id}&option=${option}`);
  };

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await http.get(apiRoutes.users);
      if (res.data.data) {
        setUsers(res.data.data);
        setFilteredUserList(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (user: IUser) => {
    Modal.confirm({
      title: "Xác nhận xóa tài khoản",
      content: `Bạn có chắc muốn xóa tài khoản?`,
      onOk: async () => {
        try {
          const res = await http.delete(`${apiRoutes.users}/${user.id}`);
          if (res.status === 204) {
            fetchUsers();
            messageApi.open({
              type: "success",
              content: "Xóa tài khoản thành công",
            });
          }
        } catch (error) {
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

    const filtered = users.filter((user: any) =>
      Object.keys(user).some((key) =>
        removeVietnameseTones(String(user[key]))
          .toLowerCase()
          .includes(normalizedSearchTerm)
      )
    );

    setFilteredUserList(filtered);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns: ProColumns[] = [
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      sorter: false,
      align: "center",
      render: (_, row) => moment(row.created_at).format("DD-MM-YYYY"),
    },
    {
      title: "Hành động",
      align: "center",
      key: "actions",
      render: (_, row) => (
        <Space>
          <Button type="dashed" onClick={() => handleEdit(row, "edit")}>
            Sửa
          </Button>
          <Button type="dashed" onClick={() => handleEdit(row, "reset-password")}>
            Đổi mật khẩu
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
            key: webRoutes.users,
            title: <Link to={webRoutes.users}>Tài khoản</Link>,
          },
        ],
      }}
    >
      {contextHolder}
      <ProTable
        columns={columns}
        cardBordered={false}
        loading={isLoading}
        cardProps={{
          title: <Title level={5}>Danh sách tài khoản</Title>,
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
              <Link to={webRoutes.newUser}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm tài khoản
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
          const data = filteredUserList.slice(
            ((params?.current ?? 1) - 1) * (params?.pageSize ?? 10),
            (params?.current ?? 1) * (params?.pageSize ?? 10)
          );
          return {
            data,
            success: true,
            total: filteredUserList.length,
          } as RequestData<(typeof filteredUserList)[0]>;
        }}
        options={{
          reload: false,
          density: false,
          setting: false,
        }}
        dataSource={filteredUserList}
        dateFormatter="string"
        rowKey="id"
        search={false}
        size="small"
      />
    </BasePageContainer>
  );
};

export default UserListPage;
