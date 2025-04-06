import {
  Button,
  Space,
  Form,
  Typography,
  Divider,
  Card,
  message,
  Popconfirm,
} from "antd";
import { IDriver } from "@/interfaces/driver";
import { webRoutes } from "@/routes/web";
import { ProTable, ProColumns } from "@ant-design/pro-components";
import SummaryFormDriver from "./SummaryFormDriver";
import * as XLSX from "xlsx";
import { ORDER_KEYS, PAYSLIP_KEYS } from "@/constants";
import moment from "moment";
import http from "@/lib/http";
import { apiRoutes } from "@/routes/api";
import { BsFileEarmarkExcel } from "react-icons/bs";

const { Text } = Typography;

const InternalSumary = ({
  orderListSummarized,
  payslipList,
  orderListRaw,
  selectedYear,
  selectedMonth,
  form,
  fetchPayslips,
}: any) => {
  const hanleViewOrderListByDriver = (driverId: string) => {
    const url = `${webRoutes.orders}?year=${selectedYear}&month=${selectedMonth}&driver_id=${driverId}&contractor_id=all`;
    window.open(url, "_blank");
  };

  const exportExcel = (driver: IDriver) => {
    const orderRecords = orderListRaw.filter(
      (item: any) => item.driver_id === driver.id
    );

    const payslipRecords = payslipList.filter(
      (item: any) => item.driver_id === driver.id
    );

    exportSingleDriverToExcel(orderRecords, payslipRecords, driver);
  };

  const exportSingleDriverToExcel = (
    orderRecords: any,
    payslipRecords: any,
    driver?: any
  ) => {
    const payslipRows = payslipRecords.map((payslip: any) =>
      PAYSLIP_KEYS.map((keyItem) => {
        let result = undefined;
        if (keyItem.value === "contractor_id") {
          result = payslip.contractor.name;
        } else if (keyItem.value === "driver_id") {
          result = payslip?.driver?.full_name;
        } else if (keyItem.value === "month_year") {
          result = `${payslip.month}-${payslip.year}`;
        } else {
          result = payslip[keyItem.value];
        }

        return result;
      })
    );

    const orderRows = orderRecords.map((order: any) =>
      ORDER_KEYS.map((keyItem) => {
        if (keyItem.value === "contractor_id") {
          return order.contractor.name;
        } else if (keyItem.value === "driver_id") {
          return order?.driver?.full_name;
        } else if (keyItem.value === "truck_id") {
          return `${order.truck.license_plate} ${order.truck.capacity}T`;
        } else if (keyItem.value === "order_time") {
          return moment(order.order_time).format("DD-MM-YYYY");
        }
        return order[keyItem.value];
      })
    );

    const firstSection = [ORDER_KEYS.map((item) => item.label), ...orderRows];

    const blankRows = Array(8).fill([]);

    const secondSection = [
      PAYSLIP_KEYS.map((item) => item.label),
      ...payslipRows,
    ];

    const data = [
      [["DANH SÁCH ĐƠN HÀNG"], [], [], [], [], []],
      ...firstSection,
      blankRows,
      blankRows,
      blankRows,
      blankRows,
      [["TỔNG LƯƠNG"], [], [], [], []],
      ...secondSection,
    ];

    // Create a worksheet from the data array
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      driver?.full_name || `Bảng cước ${selectedMonth}-${selectedYear}`
    );

    XLSX.writeFile(
      workbook,
      `${driver?.full_name || "Bảng cước"
      }-${selectedMonth}-${selectedYear}.xlsx`
    );
  };

  const handleDeletePayslip = async (payslipId: string) => {
    try {
      await http.delete(`${apiRoutes.payslips}/${payslipId}`);
      message.success("Đã xóa Bảng cước");
      fetchPayslips();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const columns: ProColumns[] = [
    {
      title: "Tài xế",
      dataIndex: "driver_id",
      sorter: false,
      align: "center",
      ellipsis: true,
      render: (_, row) => <>{row.driver?.full_name}</>,
    },
    {
      title: "Lương cơ bản",
      dataIndex: "fixed_salary",
      sorter: false,
      align: "center",
      ellipsis: true,
      render: (_, row) => row?.driver?.fixed_salary?.toLocaleString(),
    },
    {
      title: "Số chuyến",
      dataIndex: "total_trips",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Tổng cước",
      dataIndex: "final_salary",
      sorter: false,
      align: "center",
      ellipsis: true,
      render: (_, row) => (
        <span className="text-red-600 font-bold">
          {row?.final_salary?.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Hành động",
      align: "center",
      key: "actions",
      render: (_, row) => (
        <Space>
          <Button
            type="dashed"
            onClick={() => hanleViewOrderListByDriver(row.driver_id)}
          >
            Chi tiết
          </Button>
          <Button
            type="dashed"
            onClick={() => exportExcel(row.driver)}
            icon={<BsFileEarmarkExcel />}
          >
            Tải xuống Excel
          </Button>
          <Popconfirm
            title="Xóa Bảng cước"
            description="Bạn có thực sự muốn xóa Bảng cước?"
            onConfirm={() => handleDeletePayslip(row.id)}
            okText="Xóa"
            cancelText="Thoát"
          >
            <Button>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable
        columns={columns}
        cardBordered={false}
        bordered={true}
        scroll={{ x: true }}
        tableLayout={"fixed"}
        rowSelection={false}
        pagination={false}
        dataSource={payslipList}
        dateFormatter="string"
        rowKey="id"
        search={false}
        size="small"
        options={{
          reload: false,
          density: false,
          setting: false,
        }}
        cardProps={{
          title: (
            <h4>
              Bảng tổng hợp lương{" "}
              {selectedMonth && selectedYear && (
                <>
                  {selectedMonth}-{selectedYear}
                </>
              )}
            </h4>
          ),
        }}
      />
      <Text italic>Bảng thống kê đã tính tổng các lương và phụ cấp</Text>

      <Divider />

      {orderListSummarized?.map((item: any) => {
        const existPayslip = payslipList?.find(
          (p: any) => p.driver_id === item.driver_id
        );

        return (
          <Card
            styles={{
              header: {
                backgroundColor: "#f1f1f1",
              },
            }}
            size="small"
            key={item.driver_id}
            title={`${item?.driver?.full_name}, Tháng ${form.getFieldValue(
              "month"
            )}-${form.getFieldValue("year")} - ${existPayslip?.submitted ? "Đã lưu" : "Chưa lưu"
              }`}
            className="mb-8"
          >
            <SummaryFormDriver
              data={{
                ...item,
                existPayslip: existPayslip,
              }}
              year={selectedYear}
              month={selectedMonth}
              fetchPayslips={fetchPayslips}
              hanleViewOrderListByDriver={hanleViewOrderListByDriver}
            />
          </Card>
        );
      })}
    </>
  );
};

export default InternalSumary;
