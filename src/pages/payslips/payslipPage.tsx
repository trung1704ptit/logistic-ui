import React, { useState, useEffect } from "react";
import { Select, Button, Table, Row, Col, Spin, Space } from "antd";
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
      setSelectedDriver(null); // Reset selected driver when contractor changes
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

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Row gutter={16}>
        <Col span={6}>
          <Select
            placeholder="Select Year"
            value={selectedYear}
            onChange={(value) => setSelectedYear(value)}
            style={{ width: "100%" }}
          >
            {Array.from({ length: 10 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <Select.Option key={year} value={year}>
                  {year}
                </Select.Option>
              );
            })}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            placeholder="Select Month"
            value={selectedMonth}
            onChange={(value) => setSelectedMonth(value)}
            style={{ width: "100%" }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <Select.Option key={i + 1} value={i + 1}>
                {i + 1}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            placeholder="Select Contractor"
            value={selectedContractor}
            onChange={(value) => setSelectedContractor(value)}
            style={{ width: "100%" }}
          >
            {contractors.map((contractor) => (
              <Select.Option key={contractor.id} value={contractor.id}>
                {contractor.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            placeholder="Select Driver"
            value={selectedDriver}
            onChange={(value) => setSelectedDriver(value)}
            style={{ width: "100%" }}
            disabled={!selectedContractor} // Disable driver select if no contractor is selected
          >
            {filteredDrivers.map((driver) => (
              <Select.Option key={driver.id} value={driver.id}>
                {driver.full_name}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Space>
        <Button
          type="primary"
          onClick={handleFetchPayslip}
          style={{ marginTop: 16 }}
          disabled={
            !selectedYear ||
            !selectedMonth ||
            !selectedDriver ||
            !selectedContractor
          }
        >
          Xem lương
        </Button>

        <Button
          type="dashed"
          onClick={handleFetchPayslip}
          style={{ marginTop: 16 }}
          disabled={
            !selectedYear ||
            !selectedMonth ||
            !selectedDriver ||
            !selectedContractor
          }
        >
          Tải xuống Excel
        </Button>
      </Space>

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
