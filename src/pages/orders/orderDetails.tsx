import React, { useState } from "react";
import { Typography, Modal, List, Button, message } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getTotalOrder, getUnitLabel } from "@/lib/utils";
import { IOrder } from "@/interfaces/order";
import http from "@/lib/http";
import { apiRoutes } from "@/routes/api";
import dayjs from "dayjs";
import { webRoutes } from "@/routes/web";
import { useNavigate } from "react-router-dom";
import { IClient } from "@/interfaces/client";

const { Text } = Typography;

interface ReviewProps {
  isReadOnly: boolean;
  orderId?: string | null;
  onClose: () => void;
  data: IOrder;
  client?: IClient;
}

const ReviewComponent: React.FC<ReviewProps> = ({
  data,
  isReadOnly,
  orderId,
  onClose,
  client,
}) => {
  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );
  const trucks = useSelector((state: RootState) => state.truck.trucks);
  const drivers = useSelector((state: RootState) => state.driver.drivers);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (!data) {
    return null;
  }

  data = {
    ...data,
    trip_salary: data.trip_salary || 0,
    daily_salary: data.daily_salary || 0,
    point_salary: data.point_salary || 0,
    point_count: data.point_count || 0,
    recovery_fee: data.recovery_fee || 0,
    loading_salary: data.loading_salary || 0,
    meal_fee: data.meal_fee || 0,
    other_salary: data.other_salary || 0,
    standby_fee: data.standby_fee || 0,
    parking_fee: data.parking_fee || 0,
    outside_oil_fee: data.outside_oil_fee || 0,
    price_for_contractor: data.price_for_contractor || 0,
    price_from_client: data.price_from_client || 0,
    oil_fee: data.oil_fee || 0,
    charge_fee: data.charge_fee || 0,
  };

  const contractor = data.contractor
    ? data.contractor
    : contractors.find((item) => item.id === data.contractor_id);
  const truck = data.truck
    ? data.truck
    : trucks.find((item) => item.id === data.truck_id);
  const driver = data.driver
    ? data.driver
    : drivers.find((item) => item.id === data.driver_id);

  const formData = [
    { name: "Ngày tạo", value: moment(data.order_time).format("DD-MM-YYYY") },
    {
      name: "Nhà thầu",
      value: contractor?.name,
    },
    {
      name: "Xe tải",
      value: truck?.license_plate
        ? `${truck?.license_plate} - ${truck?.capacity}T`
        : "",
    },
    {
      name: "Tài xế",
      value: driver?.full_name,
    },
    { name: "Nhãn hàng", value: client?.name },
    {
      name: "Lấy hàng",
      value: `${data.pickup_province} - ${data.pickup_district}`,
    },
    {
      name: "Trả hàng",
      value: `${data.delivery_province} - ${data.delivery_district}`,
    },
    { name: "Đơn vị tính", value: getUnitLabel(data.unit) },
    { name: "Trọng tải xe", value: truck?.capacity },
    { name: "Trọng tải của đơn hàng", value: data.package_weight },
    { name: "Lương chuyến", value: data.trip_salary },
    { name: "Giá cước từ nhãn hàng", value: data.price_from_client },
    { name: "Cước chuyến cho nhà thầu", value: data.price_for_contractor },
    { name: "Lương theo ngày", value: data.daily_salary },
    { name: "Số điểm", value: data.point_count },
    { name: "Lương điểm", value: data.point_salary },
    { name: "Phí thu hồi", value: data.recovery_fee },
    { name: "Lương bốc xếp", value: data.loading_salary },
    { name: "Tiền ăn", value: data.meal_fee },
    { name: "Chi khác", value: data.other_salary },
    { name: "Phí lưu ca", value: data.standby_fee },
    { name: "Vé bãi", value: data.parking_fee },
    { name: "Đổ dầu ngoài", value: data.outside_oil_fee },
    { name: "Chi dầu", value: data.oil_fee },
    { name: "Thu cước", value: data.charge_fee },
  ];
  const total = isReadOnly ? data.total_salary : getTotalOrder(data);
  const conclusion = [{ name: "Tổng cước", value: total }];

  const handleSave = async () => {
    try {
      const payload = {
        ...data,
        order_time: dayjs(data.order_time),
        total_salary: total,
      };
      setIsLoading(true);
      let res: any = {};
      if (orderId) {
        res = await http.put(`${apiRoutes.orders}/${orderId}`, payload);
      } else {
        res = await http.post(apiRoutes.orders, payload);
      }
      if (res && res.data) {
        const successMsg = orderId
          ? "Cập nhật đơn hàng thành công"
          : "Đã tạo đơn hàng thành công";
        message.success(successMsg);
        navigate(webRoutes.orders);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateOrder = () => {
    navigate(`${webRoutes.updateOrder}?id=${data?.id}`);
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
            onClick={handleUpdateOrder}
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
          dataSource={formData}
          bordered
          renderItem={(item) => (
            <List.Item style={{ padding: "1px 16px" }}>
              <Text>{item.name}</Text>
              <Text strong style={{ textAlign: "right", display: "block" }}>
                {item?.value?.toLocaleString()}
              </Text>
            </List.Item>
          )}
        />
      </div>
      {data.order_type === "internal" && (
        <Typography.Text italic>
          Chi dầu và Thu cước không được tính vào lương
        </Typography.Text>
      )}

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
