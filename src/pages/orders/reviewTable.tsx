import React, { useEffect, useState } from "react";
import {
  Typography,
  Modal,
  List,
  Button,
} from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getTotalOrder } from "@/lib/utils";

const { Text } = Typography;


interface ReviewProps {
  isReview: boolean;
  onClose: () => void;
  formData: {
    contractor: string;
    order_time: string;
    company_name: string;
    driver: string;
    truck: string;
    prices: string;
    pickup_province: string;
    pickup_district?: string;
    delivery_province: string;
    delivery_district?: string;
    unit: string;
    package_weight?: number;
    package_volumn?: number;
    trip_salary: number;
    daily_salary: number;
    point_count: number;
    point_salary: number;
    recovery_fee: number;
    loading_fee: number;
    meal_fee: number;
    standby_fee: number;
    parking_fee: number;
    outside_oil_fee: number;
    oil_fee: number;
    charge_fee: number;
    other_salary: number;
    note?: string;
  };
}

const ReviewComponent: React.FC<ReviewProps> = ({
  formData,
  isReview,
  onClose,
}) => {
  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );
  const trucks = useSelector((state: RootState) => state.truck.trucks);
  const drivers = useSelector((state: RootState) => state.driver.drivers);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    setData(formData);
  }, [formData]);

  const feeData = [
    { name: "Ngày tạo", value: moment(data.order_time).format("DD-MM-YYYY") },
    {
      name: "Nhà thầu",
      value: contractors.find((item) => item.id === data.contractor)?.name,
    },
    {
      name: "Xe tải",
      value: trucks.find((item) => item.id === data.truck)?.license_plate,
    },
    {
      name: "Tài xế",
      value: drivers.find((item) => item.id === data.driver)?.full_name,
    },
    { name: "Nhãn hàng", value: data.company_name },
    {
      name: "Lấy hàng",
      value: `${data.pickup_province} - ${data.pickup_district}`,
    },
    {
      name: "Trả hàng",
      value: `${data.delivery_province} - ${data.delivery_district}`,
    },
    { name: "Lương chuyến", value: data.trip_salary },
    { name: "Lương theo ngày", value: data.daily_salary },
    { name: "Số điểm", value: data.point_count },
    { name: "Lương điểm", value: data.point_salary },
    { name: "Phí thu hồi", value: data.recovery_fee },
    { name: "Lương bốc xếp", value: data.loading_fee },
    { name: "Tiền ăn", value: data.meal_fee },
    { name: "Phí lưu ca", value: data.standby_fee },
    { name: "Vé bãi", value: data.parking_fee },
    { name: "Đổ dầu ngoài", value: data.outside_oil_fee },
    { name: "Chi dầu", value: data.oil_fee },
    { name: "Thu cước", value: data.charge_fee },
  ];

  const conclusion = [{ name: "Tổng cộng", value: getTotalOrder(data) }];

  return (
    <Modal
      title="Xem lại Đơn hàng"
      centered
      open={isReview}
      onOk={onClose}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Thoát
        </Button>,
        <Button key="submit" type="primary" onClick={onClose}>
          Lưu lại
        </Button>,
      ]}
    >
      <div>
        <List
          size="small"
          dataSource={feeData}
          bordered
          renderItem={(item) => (
            <List.Item style={{ padding: "4px 16px" }}>
              <Text>{item.name}</Text>
              <Text strong style={{ textAlign: "right", display: "block" }}>
                {item?.value?.toLocaleString()}
              </Text>
            </List.Item>
          )}
        />
      </div>

      <div style={{ marginTop: 16, fontWeight: "bold" }}>
        <List
          dataSource={conclusion}
          renderItem={(item) => (
            <List.Item style={{ padding: "4px 16px" }}>
              <Text>{item.name}</Text>
              <Text strong style={{ textAlign: "right", display: "block" }}>
                {item?.value?.toLocaleString()}
              </Text>
            </List.Item>
          )}
        ></List>
      </div>
    </Modal>
  );
};

export default ReviewComponent;
