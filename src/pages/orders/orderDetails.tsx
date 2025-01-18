import React, { useEffect, useState } from "react";
import { Typography, Modal, List, Button, message } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getTotalOrder } from "@/lib/utils";
import { IOrder } from "@/interfaces/order";
import http from "@/lib/http";
import { apiRoutes } from "@/routes/api";
import dayjs from "dayjs";
import { webRoutes } from "@/routes/web";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

interface ReviewProps {
  isReadOnly: boolean;
  onClose: () => void;
  data: IOrder;
}

const ReviewComponent: React.FC<ReviewProps> = ({
  data,
  isReadOnly,
  onClose,
}) => {
  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );
  const trucks = useSelector((state: RootState) => state.truck.trucks);
  const drivers = useSelector((state: RootState) => state.driver.drivers);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  if (!data) {
    return null;
  }

  const truck = trucks.find((item) => item.id === data.truck_id);

  const feeData = [
    { name: "Ngày tạo", value: moment(data.order_time).format("DD-MM-YYYY") },
    {
      name: "Nhà thầu",
      value: contractors.find((item) => item.id === data.contractor_id)?.name,
    },
    {
      name: "Xe tải",
      value: `${truck?.license_plate} - ${truck?.capacity}T`,
    },
    {
      name: "Tài xế",
      value: drivers.find((item) => item.id === data.driver_id)?.full_name,
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
    { name: "Lương bốc xếp", value: data.loading_salary },
    { name: "Tiền ăn", value: data.meal_fee },
    { name: "Phí lưu ca", value: data.standby_fee },
    { name: "Vé bãi", value: data.parking_fee },
    { name: "Đổ dầu ngoài", value: data.outside_oil_fee },
    { name: "Chi dầu", value: data.oil_fee },
    { name: "Thu cước", value: data.charge_fee },
  ];
  const total = data.total_salary || getTotalOrder(data);
  const conclusion = [{ name: "Tổng cộng", value: total }];

  const handleSave = async () => {
    try {
      const payload = {
        ...data,
        order_time: dayjs(data.order_time),
        total_salary: total,
      };
      setIsLoading(true);
      setIsError(false);
      const res = await http.post(apiRoutes.orders, payload);
      if (res && res.data) {
        message.success("Đã tạo đơn hàng thành công");
        navigate(webRoutes.orders);
      }
    } catch (error) {
      setIsError(true);
      message.error("Có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Chi tiết Đơn hàng"
      centered
      open={true}
      onOk={onClose}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Thoát
        </Button>,

        !isReadOnly ? (
          <Button
            key="submit"
            type="primary"
            onClick={handleSave}
            disabled={isLoading}
          >
            Lưu lại
          </Button>
        ) : (
          <Button
            key="submit"
            type="primary"
            onClick={handleSave}
            disabled={isLoading}
          >
            Sửa
          </Button>
        ),
      ]}
    >
      <div className="mb-2">
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

      <Typography.Text italic>Chi dầu và Thu cước không được tính vào lương</Typography.Text>

      <div>
        <List
          dataSource={conclusion}
          renderItem={(item) => (
            <List.Item>
              <Text className="text-bold text-red-600">{item.name}</Text>
              <Text strong className="text-bold text-red-500">
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
