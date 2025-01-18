import React, { useState, useEffect } from "react";
import { Select, Button, Table, Row, Col, Spin, Space, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { IDriver } from "@/interfaces/driver";
import { IPayslip } from "@/interfaces/payslip";
import { webRoutes } from "@/routes/web";
import BasePageContainer from "@/components/layout/pageContainer";

// interface PayslipAdminProps {
//   fetchPayslip: (
//     year: number,
//     month: number,
//     driverId: string,
//     contractorId: string
//   ) => Promise<IPayslip>; // Function to fetch payslip data
// }

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

const PayslipAdmin: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // Get contractors and drivers from Redux state
  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );
  const drivers = useSelector((state: RootState) => state.driver.drivers);

  const [selectedYear, setSelectedYear] = useState<number | null>(2025);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedContractor, setSelectedContractor] = useState<string | null>(
    null
  );
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [filteredDrivers, setFilteredDrivers] = useState<IDriver[]>([]);
  const [payslipData, setPayslipData] = useState<IPayslip | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  // Handler for fetching payslip data based on selected criteria
  const handleFetchPayslip = async () => {
    if (selectedYear && selectedMonth && selectedDriver && selectedContractor) {
      setLoading(true);
      try {
        // const data = await fetchPayslip(selectedYear, selectedMonth, selectedDriver, selectedContractor);
        // setPayslipData(data);
      } catch (error) {
        console.error("Error fetching payslip:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      // handleFetchPayslip(values); // Pass the form values to your handler
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ year: currentYear, drivers: "*" }}
      >
        <Row gutter={16}>
          <Col span={6}>
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
          <Col span={6}>
            <Form.Item
              label="Tháng"
              name="month"
              rules={[{ required: true, message: "Vui lòng chọn tháng" }]}
            >
              <Select placeholder="Chọn tháng" style={{ width: "100%" }}>
                {Array.from({ length: 12 }, (_, i) => (
                  <Select.Option key={i + 1} value={i + 1}>
                    {i + 1}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
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
          <Col span={6}>
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
          <Button
            type="primary"
            onClick={handleSubmit}
          >
            Tổng hợp lương
          </Button>
          <Button
            type="dashed"
            onClick={handleSubmit}
            disabled
          >
            Tải xuống Excel
          </Button>
        </Space>
      </Form>
      {loading ? (
        <Spin size="large" style={{ display: "block", marginTop: 20 }} />
      ) : (
        payslipData && (
          <Table
            dataSource={[payslipData]}
            columns={[
              { title: "Item", dataIndex: "item" },
              { title: "Amount", dataIndex: "amount" },
            ]}
            rowKey="item"
            style={{ marginTop: 20 }}
          />
        )
      )}
    </BasePageContainer>
  );
};

export default PayslipAdmin;
