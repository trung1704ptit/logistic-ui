import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Divider,
  Row,
  Col,
  Card,
  Modal,
  List,
  Space,
  Button,
} from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

interface FeeDetail {
  name: string;
  value: number;
}

interface ReviewProps {
  isReview: boolean;
  onClose: () => void;
  // formData: {
  //   contractor: string;
  //   order_time: string;
  //   company_name: string;
  //   driver: string;
  //   truck: string;
  //   prices: string;
  //   pickup_province: string;
  //   pickup_district?: string;
  //   delivery_province: string;
  //   delivery_district?: string;
  //   unit: string;
  //   package_weight?: number;
  //   package_volumn?: number;
  //   trip_salary: number;
  //   daily_salary: number;
  //   point_count: number;
  //   point_salary: number;
  //   recovery_fee: number;
  //   loading_fee: number;
  //   meal_fee: number;
  //   standby_fee: number;
  //   parking_fee: number;
  //   driver_refill_oil_fee: number;
  //   refill_oil_fee: number;
  //   charge_fee: number;
  //   other_fees: FeeDetail[];
  //   note?: string;
  // };
}

const ReviewComponent: React.FC<ReviewProps> = ({
  // formData,
  isReview,
  onClose,
}) => {
  const fakeData = {
    contractor: "c644cbb4-e21f-49d1-8bde-905a53d1bec5",
    order_time: "2025-01-14T08:13:02.942Z",
    company_name: "12312",
    driver: "f841c29c-394d-4828-af66-3535c9608c56",
    truck: "f3db9c29-f8c9-45bb-ba14-28bd24762cd9",
    prices: "2d31640c-555a-4aac-ab00-a414cc8e5f41",
    pickup_province: "Hải Phòng",
    pickup_district: "Lê Chân",
    delivery_province: "Hà Nội",
    delivery_district: "Cầu Giấy",
    unit: "weight",
    trip_salary: 800000,
    daily_salary: "132",
    point_count: "123",
    point_salary: "123",
    recovery_fee: "123",
    loading_fee: "123",
    meal_fee: "123",
    standby_fee: "123",
    parking_fee: "1231",
    driver_refill_oil_fee: "1231",
    refill_oil_fee: "12312",
  };
  const [data, setData] = useState<any>({});
  // const {
  //   contractor,
  //   order_time,
  //   company_name,
  //   driver,
  //   truck,
  //   // prices,
  //   pickup_province,
  //   pickup_district,
  //   delivery_province,
  //   delivery_district,
  //   unit,
  //   package_weight,
  //   package_volumn,
  //   trip_salary,
  //   daily_salary,
  //   point_count,
  //   point_salary,
  //   recovery_fee,
  //   loading_fee,
  //   meal_fee,
  //   standby_fee,
  //   parking_fee,
  //   driver_refill_oil_fee,
  //   refill_oil_fee,
  //   charge_fee,
  //   other_fees,
  //   note,
  // } = formData;

  useEffect(() => {
    setData(fakeData);
  }, []);

  const feeColumns = [
    {
      title: "Tên chi phí",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số tiền (VND)",
      dataIndex: "value",
      key: "value",
      render: (value: number) => value,
    },
  ];

  const feeData = [
    { name: "Lương chuyến", value: data.trip_salary },
    { name: "Lương theo ngày", value: data.daily_salary },
    { name: "Lương điểm", value: data.point_count * data.point_salary },
    { name: "Phí thu hồi", value: data.recovery_fee },
    { name: "Lương bốc xếp", value: data.loading_fee },
    { name: "Tiền ăn", value: data.meal_fee },
    { name: "Phí lưu ca", value: data.standby_fee },
    { name: "Vé bãi", value: data.parking_fee },
    { name: "Đổ dầu ngoài", value: data.driver_refill_oil_fee },
    { name: "Chi dầu", value: data.refill_oil_fee },
    { name: "Thu cước", value: data.charge_fee },
    // Add more fields here as necessary
  ];

  return (
    <Modal
      title="Xem trước Đơn hàng"
      centered
      open={isReview}
      onOk={onClose}
      onCancel={onClose}
    >
      <div>
        <List
          size="small"
          dataSource={feeData}
          bordered
          renderItem={(item) => (
            <List.Item>
              <Text>{item.name}</Text>
              <Text strong style={{ textAlign: "right", display: "block" }}>
                {item?.value?.toLocaleString()}
              </Text>
            </List.Item>
          )}
        />
      </div>

      <div style={{ marginTop: 16, fontWeight: "bold" }}>
        <List>
          <List.Item>
            <List.Item.Meta
              title={<Text>Tổng cộng</Text>}
              description={
                <Text style={{ textAlign: "right", display: "block" }}>
                  100
                </Text>
              }
            />
          </List.Item>
        </List>
      </div>
    </Modal>
  );
};

export default ReviewComponent;
