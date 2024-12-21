import React, { useState } from "react";
import { ProTable, ProColumns, RequestData } from "@ant-design/pro-components";
import { Button, Input, Space, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { PlusOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { priceList } from "@/__mocks__";
import { removeVietnameseTones } from "@/lib/utils";

const breadcrumb = {
  items: [
    { key: webRoutes.dashboard, title: <Link to={webRoutes.dashboard}>Trang chủ</Link> },
    { key: webRoutes.prices, title: <Link to={webRoutes.prices}>Bảng giá</Link> },
  ],
};

const PriceListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [filteredPriceList, setFilteredPriceList] = useState(priceList);

  const handleEditPrice = (price: any) => {
    navigate(`${webRoutes.updatePrice}?id=${price.id}`);
  };

  const handleDeletePrice = (price: any) => {
    Modal.confirm({
      title: "Xác nhận xóa giá",
      content: `Bạn có chắc muốn xóa giá ${price.name}?`,
      onOk: () => {
        console.log("Deleted price:", price);
      },
    });
  };

  const columns: ProColumns[] = [
    {
      title: "Trọng tải",
      dataIndex: "weight",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: true,
      align: "center",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Hành động",
      align: "center",
      key: "actions",
      render: (_, row) => (
        <Space>
          <Button type="dashed" onClick={() => handleEditPrice(row)}>
            Sửa
          </Button>
          <Button danger onClick={() => handleDeletePrice(row)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleSearch = (searchTerm: string) => {
    const normalizedSearchTerm = removeVietnameseTones(searchTerm.toLowerCase());

    const filtered = priceList.filter((price: any) =>
      Object.keys(price).some((key) =>
        removeVietnameseTones(String(price[key])).toLowerCase().includes(normalizedSearchTerm)
      )
    );

    setFilteredPriceList(filtered);
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          title: "Bảng giá",
          extra: (
            <Space>
              <Input
                placeholder="Tìm kiếm giá..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  handleSearch(value);
                }}
                style={{ minWidth: "10%" }}
              />
              <Link to={webRoutes.addNewPrice}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm giá
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
          const data = filteredPriceList.slice(
            ((params?.current ?? 1) - 1) * (params?.pageSize ?? 10),
            (params?.current ?? 1) * (params?.pageSize ?? 10)
          );
          return {
            data,
            success: true,
            total: filteredPriceList.length,
          } as RequestData<(typeof priceList)[0]>;
        }}
        dataSource={filteredPriceList}
        dateFormatter="string"
        rowKey="id"
        search={false}
        size="small"
      />
    </BasePageContainer>
  );
};

export default PriceListPage;
