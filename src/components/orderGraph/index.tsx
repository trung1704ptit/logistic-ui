import { AppDispatch, RootState } from "@/store";
import { fetchOrders } from "@/store/slices/orderSlice";
import { Select, Space } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";

const d = new Date();
const currentYear = d.getFullYear();
const currentMonth = d.getMonth();

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OrderGraph = () => {
  const [time, setTime] = useState({
    month: currentMonth + 1,
    year: currentYear,
  });
  const dispatch = useDispatch<AppDispatch>();

  const orderState = useSelector((state: RootState) => state.order);

  const handleChangeTime = (value: number, name: string) => {
    setTime({
      ...time,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(fetchOrders(time.year, time.month));
  }, [time]);

  const getOrderCountsByDay = (orders: any, month: number, year: number) => {
    const daysInMonth = new Date(year, month, 0).getDate(); // Số ngày trong tháng
    const counts = Array(daysInMonth).fill(0); // Khởi tạo mảng đếm với giá trị 0

    orders.forEach((order: any) => {
      const orderDate = new Date(order.created_at);
      if (
        orderDate.getMonth() + 1 === month && // Kiểm tra đúng tháng
        orderDate.getFullYear() === year // Kiểm tra đúng năm
      ) {
        const day = orderDate.getDate(); // Lấy ngày trong tháng
        counts[day - 1] += 1; // Tăng số lượng cho ngày đó
      }
    });

    return counts;
  };

  const orderCounts = getOrderCountsByDay(
    orderState.orders,
    time.month,
    time.year
  );
  const daysInMonth = Array.from(
    { length: orderCounts.length },
    (_, i) => i + 1
  );

  const data = {
    labels: daysInMonth.map((day) => `Ng.${day}`),
    datasets: [
      {
        label: "Số đơn hàng",
        data: orderCounts,
        backgroundColor: "#4caf50",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Thống kê đơn hàng tháng ${time.month}/${time.year}`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Ngày",
        },
      },
      y: {
        title: {
          display: true,
          text: "Số đơn hàng",
        },
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  const oilFee = useMemo(() => {
    return orderState.orders.reduce((acc, current) => acc + current.oil_fee, 0);
  }, [orderState.orders]);

  return (
    <div className="min-h-[150px] bg-white rounded-md p-3">
      <Space>
        <Select
          placeholder="Chọn tháng"
          style={{ width: "100%" }}
          onChange={(value) => handleChangeTime(value, "month")}
          value={time.month}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <Select.Option key={i + 1} value={i + 1}>
              Tháng {i + 1}
            </Select.Option>
          ))}
        </Select>
        <Select
          placeholder="Chọn năm"
          style={{ width: "100%" }}
          onChange={(value) => handleChangeTime(value, "year")}
          value={time.year}
        >
          {Array.from({ length: 5 }, (_, i) => {
            const year = currentYear - i;
            return (
              <Select.Option key={year} value={year}>
                {year}
              </Select.Option>
            );
          })}
        </Select>
      </Space>
      <ul>
        <li>
          Tổng số đơn: <strong>{orderState.orders.length}</strong>
        </li>
        <li>
          Tổng tiền chi dầu: <strong>{oilFee.toLocaleString()}</strong>
        </li>
      </ul>

      {orderState.loading ? (
        <div className="flex p-4">Loading...</div>
      ) : (
        <div style={{ height: "400px", width: "100%" }}>
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default OrderGraph;
