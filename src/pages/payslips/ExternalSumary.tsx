import {
  Button,
  Space,
  Typography,
  Divider,
  Card,
  message,
  Popconfirm,
} from "antd";
import { IDriver } from "@/interfaces/driver";
import { webRoutes } from "@/routes/web";
import { ProTable, ProColumns } from "@ant-design/pro-components";
import SummaryFormContractor from "./SummaryFormContractor";
import * as XLSX from "xlsx";
import { KEYS_ORDER, KEYS_PAYSLIP } from "@/constants";
import moment from "moment";
import http from "@/lib/http";
import { apiRoutes } from "@/routes/api";

const { Text } = Typography;

const ExternalSumary = ({
  orderListSummarized,
  payslipList,
  orderListRaw,
  selectedYear,
  selectedMonth,
  form,
  fetchPayslips,
}: any) => {
  const hanleViewOrderList = (contratorId: string) => {
    const url = `${webRoutes.orders}?year=${selectedYear}&month=${selectedMonth}&contractor_id=${contratorId}&driver_id=all`;
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
      KEYS_PAYSLIP.map((keyItem) => {
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
      KEYS_ORDER.map((keyItem) => {
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

    const firstSection = [KEYS_ORDER.map((item) => item.label), ...orderRows];

    const blankRows = Array(8).fill([]);

    const secondSection = [
      KEYS_PAYSLIP.map((item) => item.label),
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
      driver?.full_name || `Bảng lương ${selectedMonth}-${selectedYear}`
    );

    XLSX.writeFile(
      workbook,
      `${
        driver?.full_name || "Bảng lương"
      }-${selectedMonth}-${selectedYear}.xlsx`
    );
  };

  //   const exportAllDriverToExcel = () => {
  //     exportSingleDriverToExcel(orderListRaw, payslipList);
  //   };

  const handleDeletePayslip = async (payslipId: string) => {
    try {
      await http.delete(`${apiRoutes.payslips}/${payslipId}`);
      message.success("Đã xóa bảng lương");
      fetchPayslips();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const columns: ProColumns[] = [
    {
      title: "Nhà thầu",
      dataIndex: "contractor_id",
      sorter: false,
      align: "center",
      ellipsis: true,
      render: (_, row) => <>{row.contractor?.name}</>,
    },
    {
      title: "Số chuyến",
      dataIndex: "total_trips",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Tổng cước",
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
            onClick={() => hanleViewOrderList(row.contractor_id)}
          >
            Chi tiết
          </Button>
          <Button type="dashed" onClick={() => exportExcel(row.driver)}>
            Tải xuống Excel
          </Button>
          <Popconfirm
            title="Xóa bảng lương"
            description="Bạn có thực sự muốn xóa bảng lương?"
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

      <Divider />

      {orderListSummarized.map((item: any) => {
        const existPayslip = payslipList.find(
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
            key={item.contractor_id}
            title={`${item?.contractor?.name}, Tháng ${form.getFieldValue(
              "month"
            )}-${form.getFieldValue("year")}`}
            className="mb-8"
          >
            <SummaryFormContractor
              data={{
                ...item,
                existPayslip: existPayslip,
              }}
              year={selectedYear}
              month={selectedMonth}
              fetchPayslips={fetchPayslips}
              hanleViewOrderList={hanleViewOrderList}
            />
          </Card>
        );
      })}
    </>
  );
};

export default ExternalSumary;
