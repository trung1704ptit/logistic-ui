import React, { useState, useEffect } from "react";
import {
  Select,
  Button,
  Row,
  Col,
  Spin,
  Space,
  Form,
  Typography,
  Divider,
  Card,
} from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { IDriver } from "@/interfaces/driver";
import { IPayslip } from "@/interfaces/payslip";
import { webRoutes } from "@/routes/web";
import BasePageContainer from "@/components/layout/pageContainer";
import { apiRoutes } from "@/routes/api";
import http from "@/lib/http";
import { ProTable, ProColumns } from "@ant-design/pro-components";
import { IOrder } from "@/interfaces/order";
import SummarizeForm from "./SummarizeForm";

const { Text } = Typography;

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

interface IForm {
  month: number;
  year: number;
  contractor_id: string;
  drivers: string[];
}

function summarizeByDriverId(data: IOrder[]) {
  const summary: any = {};

  data.forEach((entry) => {
    const { driver_id, driver, contractor, ...fields } = entry;

    if (!summary[driver_id]) {
      summary[driver_id] = {
        driver_id,
        driver,
        contractor,
        total_trips: 0,
        trip_salary: 0,
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
      };
    }

    summary[driver_id].total_trips += 1;
    summary[driver_id].trip_salary += fields.trip_salary || 0;
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
  });

  return Object.values(summary);
}

const PayslipAdmin: React.FC = () => {
  const [form] = Form.useForm();

  // Get contractors and drivers from Redux state
  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );
  const drivers = useSelector((state: RootState) => state.driver.drivers);

  const [selectedContractor, setSelectedContractor] = useState<string | null>(
    null
  );
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [filteredDrivers, setFilteredDrivers] = useState<IDriver[]>([]);
  const [payslipData, setPayslipData] = useState<IPayslip | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const currentYear = new Date().getFullYear();
  const selectedMonth = form.getFieldValue("month");
  const selectedYear = form.getFieldValue("year");

  // Handle contractor selection and filter drivers based on the contractor
  useEffect(() => {
    if (selectedContractor) {
      const filtered = drivers.filter(
        (driver) => driver.contractor_id === selectedContractor
      );

      setFilteredDrivers(filtered);
      setSelectedDriver(null);
    }
  }, [selectedContractor, drivers]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsLoading(true);
      const res = await http.get(
        `${apiRoutes.orders}?year=${values.year}&month=${values.month}`
      );
      if (res && res.data) {
        const sumarizedData: any = summarizeByDriverId(res.data.data);
        setData(sumarizedData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const hanleViewOrderListByDriver = (driverId: string) => {
    const url = `${webRoutes.orders}?year=${selectedYear}&month=${selectedMonth}&driver_id=${driverId}`;
    window.open(url, "_blank");
  };

  const columns: ProColumns[] = [
    {
      title: "Tài xế",
      dataIndex: "driver_id",
      sorter: false,
      align: "center",
      ellipsis: true,
      render: (_, row) => <>{row.driver.full_name}</>,
    },
    {
      title: "Lương cơ bản",
      dataIndex: "fixed_salary",
      sorter: false,
      align: "center",
      ellipsis: true,
      render: (_, row) => row?.driver.fixed_salary.toLocaleString(),
    },
    {
      title: "Số chuyến",
      dataIndex: "total_trips",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Thực lĩnh",
      dataIndex: "total_trips2",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "total_trips2",
      sorter: false,
      align: "center",
      ellipsis: true,
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
            type="default"
            onClick={() => hanleViewOrderListByDriver(row.driver_id)}
          >
            Tải xuống
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ year: currentYear, drivers: "*" }}
      >
        <Row gutter={16}>
          <Col xs={12} sm={3}>
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
          <Col xs={12} sm={3}>
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
          <Col xs={12} sm={3}>
            <Form.Item
              label="Nhà Thầu"
              name="contractor_id"
              rules={[{ required: true, message: "Vui lòng chọn nhà thầu" }]}
            >
              <Select
                placeholder="Chọn nhà thầu"
                style={{ width: "100%" }}
                onChange={(val) => setSelectedContractor(val)}
              >
                {contractors.map((contractor) => (
                  <Select.Option key={contractor.id} value={contractor.id}>
                    {contractor.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} sm={3}>
            <Form.Item
              label="Tài Xế"
              name="drivers"
              rules={[{ required: true, message: "Vui lòng chọn tài xế" }]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn tài xế"
                style={{ width: "100%" }}
              >
                <Select.Option key={"*"} value={"*"}>
                  Tất cả
                </Select.Option>
                {filteredDrivers.map((driver) => (
                  <Select.Option key={driver.id} value={driver.id}>
                    {driver.full_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Space>
          <Button type="primary" onClick={handleSubmit}>
            Tổng hợp lương
          </Button>
          <Button type="dashed" onClick={handleSubmit} disabled>
            Tải xuống Excel
          </Button>
        </Space>
      </Form>
      {isLoading ? (
        <Spin style={{ display: "block", marginTop: 20 }} />
      ) : (
        data && (
          <>
            <ProTable
              columns={columns}
              cardBordered={false}
              bordered={true}
              scroll={{ x: true }}
              tableLayout={"fixed"}
              rowSelection={false}
              pagination={false}
              dataSource={data}
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

            {data.map((item: any) => (
              <Card
                styles={{
                  header: { backgroundColor: "#ccebcc" },
                }}
                size="small"
                key={item.driver_id}
                title={`${item.driver.full_name}, Tháng ${form.getFieldValue(
                  "month"
                )}-${form.getFieldValue("year")}`}
                className="mb-8"
              >
                <SummarizeForm data={item} />
              </Card>
            ))}
          </>
        )
      )}
    </BasePageContainer>
  );
};

export default PayslipAdmin;
