import React, { useState, useRef, useEffect } from "react";
import { Select, Button, Row, Col, Spin, Space, Form, message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { webRoutes } from "@/routes/web";
import BasePageContainer from "@/components/layout/pageContainer";
import { apiRoutes } from "@/routes/api";
import http from "@/lib/http";
import { IOrder } from "@/interfaces/order";
import * as XLSX from "xlsx";
import { CONTRACTOR_TYPES, ORDER_KEYS, PAYSLIP_KEYS } from "@/constants";
import moment from "moment";
import { IContractor } from "@/interfaces/contractor";
import InternalSummary from "./InternalSummary";
import ExternalSummary from "./ExternalSummary";
import { BsFileEarmarkExcel } from "react-icons/bs";

const breadcrumb = {
  items: [
    {
      key: "dashboard",
      title: <a href={webRoutes.home}>Trang chủ</a>,
    },
    {
      key: "payslip",
      title: <a href={webRoutes.payslip}>Bảng lương</a>,
    },
  ],
};

function summarizeByDriverId(data: IOrder[], payslips: any) {
  const summary: any = {};

  data.forEach((entry) => {
    const { driver_id, driver, contractor, contractor_id, ...fields } = entry;
    const existPayslip = payslips?.find(
      (p: any) => p.driver_id === driver_id && p.contractor_id === contractor_id
    );
    if (driver?.full_name) {
      if (!summary[driver_id]) {
        summary[driver_id] = {
          driver_id,
          contractor_id,
          driver,
          contractor,
          total_trips: 0,
          trip_salary: 0,
          price_for_contractor: 0,
          daily_salary: 0,
          point_salary: 0,
          meal_fee: 0,
          standby_fee: 0,
          parking_fee: 0,
          loading_salary: 0,
          recovery_fee: 0,
          other_salary: 0,
          oil_fee: 0,
          outside_oil_fee: 0,
          total_salary: 0,
          charge_fee: 0,
          existPayslip
        };
      }

      summary[driver_id].total_trips += 1;
      summary[driver_id].trip_salary += fields.trip_salary || 0;
      summary[driver_id].price_for_contractor +=
        fields.price_for_contractor || 0;
      summary[driver_id].meal_fee += fields.meal_fee || 0;
      summary[driver_id].parking_fee += fields.parking_fee || 0;
      summary[driver_id].daily_salary += fields.daily_salary || 0;
      summary[driver_id].point_salary += fields.point_salary || 0;
      summary[driver_id].standby_fee += fields.standby_fee || 0;
      summary[driver_id].loading_salary += fields.loading_salary || 0;
      summary[driver_id].recovery_fee += fields.recovery_fee || 0;
      summary[driver_id].other_salary += fields.other_salary || 0;
      summary[driver_id].oil_fee += fields.oil_fee || 0;
      summary[driver_id].outside_oil_fee += fields.outside_oil_fee || 0;
      summary[driver_id].total_salary += fields.total_salary || 0;
      summary[driver_id].charge_fee += fields.charge_fee || 0;
    }
  });


  console.log("summary drivers:", summary)

  return Object.values(summary) || [];
}

function summarizeByContractor(
  data: IOrder[],
  payslips: any,
  contractorId?: string,
) {
  const summary: any = {};
  let filterData = data;
  if (contractorId !== "all") {
    filterData = data.filter(
      (item) => item.contractor_id === contractorId
    );
  }

  filterData.forEach((entry) => {
    const { driver_id, driver, contractor, contractor_id, ...fields } = entry;
    const existPayslip = payslips?.find(
      (p: any) => p.contractor_id === contractor_id
    );
    if (!summary[contractor_id]) {
      summary[contractor_id] = {
        contractor_id,
        contractor,
        total_trips: 0,
        trip_salary: 0,
        price_for_contractor: 0,
        daily_salary: 0,
        point_salary: 0,
        meal_fee: 0,
        standby_fee: 0,
        parking_fee: 0,
        loading_salary: 0,
        recovery_fee: 0,
        other_salary: 0,
        oil_fee: 0,
        outside_oil_fee: 0,
        total_salary: 0,
        charge_fee: 0,
        existPayslip
      };
    }

    summary[contractor_id].total_trips += 1;
    summary[contractor_id].trip_salary += fields.trip_salary || 0;
    summary[contractor_id].price_for_contractor +=
      fields.price_for_contractor || 0;
    summary[contractor_id].meal_fee += fields.meal_fee || 0;
    summary[contractor_id].parking_fee += fields.parking_fee || 0;
    summary[contractor_id].daily_salary += fields.daily_salary || 0;
    summary[contractor_id].point_salary += fields.point_salary || 0;
    summary[contractor_id].standby_fee += fields.standby_fee || 0;
    summary[contractor_id].loading_salary += fields.loading_salary || 0;
    summary[contractor_id].recovery_fee += fields.recovery_fee || 0;
    summary[contractor_id].other_salary += fields.other_salary || 0;
    summary[contractor_id].oil_fee += fields.oil_fee || 0;
    summary[contractor_id].outside_oil_fee += fields.outside_oil_fee || 0;
    summary[contractor_id].total_salary += fields.total_salary || 0;
    summary[contractor_id].charge_fee += fields.charge_fee || 0;
  });


  console.log('summary contractor:', summary)
  return Object.values(summary);
}


const PayslipAdmin: React.FC = () => {
  const [form] = Form.useForm();

  // Get contractors and drivers from Redux state
  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );
  const selectedContractordRef = useRef<IContractor>()
  const [isLoading, setIsLoading] = useState(false);
  const [orderListSummarized, setOrderListSummarized] = useState<any>();
  const [orderListRaw, setOrderListRaw] = useState<any>([]);
  const [payslipList, setPayslipList] = useState<any>([]);
  const settings = useSelector((state: RootState) => state.setting.settings);
  const KPIThreshold = settings?.kpi_threshold || 45;
  const KPIBonus = settings?.kpi_bonus || 500000;

  const currentYear = new Date().getFullYear();
  const selectedMonth = form.getFieldValue("month");
  const selectedYear = form.getFieldValue("year");

  const fetchPayslips = async (type?: string) => {
    try {
      const values = await form.validateFields();
      const payslipRes = await http.get(
        `${apiRoutes.payslips}?year=${values.year}&month=${values.month}&contractor_id=${values.contractor_id}&type=${type}`
      );

      if (payslipRes && payslipRes.data) {
        const payslipData = payslipRes.data.data;
        setPayslipList(payslipData);
      }
      return payslipRes.data.data;
    } catch (error) {
      console.log(error);
      return []
    }
  };

  const handleSubmitDrivers = async (data: any) => {
    try {
      const kpiSalary = data.total_trips >= KPIThreshold ? KPIBonus : 0;
      const finalSalary =
        kpiSalary +
        data.total_salary +
        data.driver.fixed_salary;

      const payload = {
        driver_id: data.driver_id,
        contractor_id: data.contractor_id,
        total_trips: data.total_trips,
        take_care_truck_salary: 0,
        point_salary: data.point_salary,
        trip_salary: data.trip_salary,
        daily_salary: data.daily_salary,
        meal_fee: data.meal_fee,
        charge_fee: data.charge_fee,
        loading_salary: data.loading_salary,
        allowance_sunday_salary: 0,
        allowance_daily_salary: 0,
        allowance_phone_salary: 0,
        kpi_salary: kpiSalary,
        oil_fee: data.oil_fee,
        other_salary: 0,
        outside_oil_fee: data.outside_oil_fee,
        parking_fee: data.parking_fee,
        recovery_fee: data.recovery_fee,
        deposit_salary: 0,
        standby_fee: data.standby_fee,
        total_salary: data.total_salary,
        final_salary: finalSalary,
        year: form.getFieldValue("year"),
        month: form.getFieldValue("month"),
        notes: "",
      };

      if (!data?.existPayslip) {
        await http.post(apiRoutes.payslips, payload);
        message.destroy();
        message.success("Đã cập nhật dữ liệu cước mới nhất");
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      message.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
      console.log(error);
    }
  };

  const handleSubmitContractors = async (data: any) => {
    try {
      const payload = {
        driver_id: data.driver_id,
        contractor_id: data.contractor_id,
        total_trips: data.total_trips,
        take_care_truck_salary: 0,
        point_salary: data.point_salary,
        trip_salary: data.trip_salary,
        daily_salary: data.daily_salary,
        meal_fee: data.meal_fee,
        charge_fee: data.charge_fee,
        loading_salary: data.loading_salary,
        allowance_sunday_salary: 0,
        allowance_daily_salary: 0,
        allowance_phone_salary: 0,
        kpi_salary: 0,
        oil_fee: data.oil_fee,
        other_salary: 0,
        outside_oil_fee: data.outside_oil_fee,
        parking_fee: data.parking_fee,
        recovery_fee: data.recovery_fee,
        deposit_salary: 0,
        standby_fee: data.standby_fee,
        total_salary: data.total_salary,
        final_salary: data.total_salary,
        year: form.getFieldValue("year"),
        month: form.getFieldValue("month"),
        notes: "",
      };

      if (!data?.existPayslip) {
        await http.post(apiRoutes.payslips, payload);
        message.destroy();
        message.success("Đã cập nhật dữ liệu cước mới nhất");
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      message.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payslips = await fetchPayslips(selectedContractordRef.current?.type);
      setIsLoading(true);
      const orderRes = await http.get(
        `${apiRoutes.orders}?year=${values.year}&month=${values.month}&contractor_id=${values.contractor_id}`
      );

      if (orderRes && orderRes.data) {
        let orderData = [];
        if (selectedContractordRef.current?.type === CONTRACTOR_TYPES.internal) {
          console.log('run into drivers')
          orderData = summarizeByDriverId(orderRes.data.data, payslips);
          orderData?.forEach(data => handleSubmitDrivers(data))
        } else {
          console.log('run into contractor...')

          orderData = summarizeByContractor(
            orderRes.data.data,
            payslips,
            values.contractor_id
          );
          orderData?.forEach(data => handleSubmitContractors(data))
        }

        setOrderListSummarized(orderData);
        setOrderListRaw(orderRes.data.data);
        setTimeout(() => {
          fetchPayslips(selectedContractordRef.current?.type)
        }, 1000)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectContractor = (contractorId: string) => {
    const filterItem = contractors.find((item) => item.id === contractorId);
    selectedContractordRef.current = filterItem;
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

  const exportAllDriverToExcel = () => {
    exportSingleDriverToExcel(orderListRaw, payslipList);
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          year: currentYear,
          contractor_id: "all"
        }}
      >
        <Row gutter={16}>
          <Col xs={12} sm={12} md={3}>
            <Form.Item
              label="Năm"
              name="year"
              rules={[{ required: true, message: "Vui lòng chọn năm" }]}
            >
              <Select placeholder="Chọn năm" style={{ width: "100%" }}>
                {Array.from({ length: 5 }, (_, i) => {
                  const year = currentYear - i;
                  return (
                    <Select.Option key={year} value={year}>
                      {year}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={4}>
            <Form.Item
              label="Tháng"
              name="month"
              rules={[{ required: true, message: "Vui lòng chọn tháng" }]}
            >
              <Select placeholder="Chọn tháng" style={{ width: "100%" }}>
                {Array.from({ length: 12 }, (_, i) => (
                  <Select.Option key={i + 1} value={i + 1}>
                    Tháng {i + 1}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={5}>
            <Form.Item
              label="Nhà Thầu"
              name="contractor_id"
              rules={[{ required: true, message: "Vui lòng chọn nhà thầu" }]}
            >
              <Select
                placeholder="Chọn nhà thầu"
                style={{ width: "100%" }}
                onChange={handleSelectContractor}
              >
                <Select.Option value="all">
                  Tất cả
                </Select.Option>
                {contractors.map((contractor) => (
                  <Select.Option key={contractor.id} value={contractor.id}>
                    {contractor.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Space>
          <Button type="primary" onClick={handleSubmit}>
            Tổng hợp cước
          </Button>
          <Button
            type="dashed"
            onClick={() => {
              if (!selectedContractordRef.current || !selectedMonth || !selectedYear) {
                message.error("Vui lòng lựa chọn nhà thầu, tháng, năm!");
                return;
              }
              exportAllDriverToExcel();
            }}
            icon={<BsFileEarmarkExcel />}
          >
            Tải xuống Excel
          </Button>
        </Space>
      </Form>
      {isLoading ? (
        <Spin style={{ display: "block", marginTop: 20 }} />
      ) : (
        orderListSummarized && (
          <>
            {selectedContractordRef.current?.type === CONTRACTOR_TYPES.internal ? (
              <InternalSummary
                orderListSummarized={orderListSummarized}
                payslipList={payslipList}
                orderListRaw={orderListRaw}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                form={form}
                fetchPayslips={() => fetchPayslips(selectedContractordRef.current?.type)}
              />
            ) : (
              <ExternalSummary
                orderListSummarized={orderListSummarized}
                payslipList={payslipList}
                orderListRaw={orderListRaw}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                form={form}
                fetchPayslips={() => fetchPayslips(selectedContractordRef.current?.type)}
              />
            )}
          </>
        )
      )}
    </BasePageContainer>
  );
};

export default PayslipAdmin;
