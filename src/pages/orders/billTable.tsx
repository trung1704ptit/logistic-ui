import React from 'react';
import { Table, Typography } from 'antd';

interface Product {
  key: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface BillProps {
  // products: Product[]; // Dữ liệu sản phẩm từ form
}
const products = [
  { key: '1', name: 'Sản phẩm A', quantity: 2, unitPrice: 100, total: 200 },
  { key: '2', name: 'Sản phẩm B', quantity: 1, unitPrice: 150, total: 150 },
];

const BillTable: React.FC<BillProps> = () => {
  const calculateTotalBill = () =>
    products.reduce((acc, product) => acc + product.total, 0);

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      className: 'text-center', // TailwindCSS để căn giữa tiêu đề
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center' as const,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      align: 'right' as const,
      render: (value: number) => (
        <span className="text-blue-600 font-medium">{`$${value.toFixed(2)}`}</span>
      ),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      key: 'total',
      align: 'right' as const,
      render: (value: number) => (
        <span className="text-green-600 font-bold">{`$${value.toFixed(2)}`}</span>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <Typography.Title
        level={4}
        className="text-center text-gray-700 mb-4"
      >
        Đơn hàng
      </Typography.Title>

      <Table
        columns={columns}
        dataSource={products}
        pagination={false}
        bordered
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell colSpan={3} align="right">
              <Typography.Text className="text-lg font-semibold text-gray-700">
                Tổng cộng:
              </Typography.Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell align="right">
              <Typography.Text className="text-lg font-bold text-red-600">
                ${calculateTotalBill().toFixed(2)}
              </Typography.Text>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
        className="table-auto"
      />
    </div>
  );
};

export default BillTable;
