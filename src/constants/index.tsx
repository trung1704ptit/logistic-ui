import { ConfigProviderProps } from "antd/es/config-provider";
import enUSIntl from "antd/locale/en_US";

export const antdConfig: ConfigProviderProps = {
  theme: {
    token: {
      colorPrimary: CONFIG.theme.accentColor,
    },
  },
  locale: enUSIntl,
};

export const priceKeys = {
  notes: "Ghi chú",
  fromCity: "Tỉnh đóng hàng",
  fromDistrict: "Huyện đóng hàng",
  toCity: "Tỉnh trả hàng",
  toDistrcit: "Huyện trả hàng",
  numOfOrder: "STT",
};

export const priceKeysBlackList = [
  priceKeys.notes,
  priceKeys.fromCity,
  priceKeys.fromDistrict,
  priceKeys.toCity,
  priceKeys.toDistrcit,
  priceKeys.numOfOrder,
];

export const SHORT_KEYS = {
  ton: "T",
  volumn: "K",
};

export const KEYS_ORDER = [
  { label: "Tài xế", value: "driver_id" },
  { label: "Nhà thầu", value: "contractor_id" },
  { label: "Xe tải", value: "truck_id" },
  { label: "Thời gian", value: "order_time" },
  { label: "Nhãn hàng", value: "company_name" },
  { label: "Tỉnh lấy hàng", value: "pickup_province" },
  { label: "Huyện lấy hàng", value: "pickup_district" },
  { label: "Tỉnh giao hàng", value: "delivery_province" },
  { label: "Huyện giao hàng", value: "delivery_district" },
  { label: "Số chuyến", value: "trip_count" },
  { label: "Lương chuyến", value: "trip_salary" },
  { label: "Lương ngày", value: "daily_salary" },
  { label: "Số điểm", value: "point_count" },
  { label: "Lương điểm", value: "point_salary" },
  { label: "Phí thu hồi", value: "recovery_fee" },
  { label: "Lương bốc xếp", value: "loading_salary" },
  { label: "Tiền ăn", value: "meal_fee" },
  { label: "Tiền lưu ca", value: "standby_fee" },
  { label: "Vé bãi", value: "parking_fee" },
  { label: "Lương khác", value: "other_salary" },
  { label: "Phí dầu ngoài", value: "outside_oil_fee" },
  { label: "Phí dầu", value: "oil_fee" },
  { label: "Thu cước", value: "charge_fee" },
  { label: "Ghi chú", value: "notes" },
  { label: "Tổng lương", value: "total_salary" },
];

export const KEYS_PAYSLIP = [
  { label: "Tài xế", value: "driver_id" },
  { label: "Nhà thầu", value: "contractor_id" },
  { label: "Thời gian", value: "month_year" },
  { label: "Lương trách nhiệm xe", value: "take_care_truck_salary" },
  { label: "Phụ cấp làm ngày CN", value: "allowance_sunday_salary" },
  { label: "Phụ cấp ngày", value: "allowance_daily_salary" },
  { label: "Phụ cấp điện thoại", value: "allowance_phone_salary" },
  { label: "Thưởng KPI 45 chuyến", value: "kpi_salary" },
  { label: "Ứng trong tháng", value: "deposit_salary" },
  { label: "Số chuyến", value: "total_trips" },
  { label: "Lương chuyến", value: "trip_salary" },
  { label: "Lương ngày", value: "daily_salary" },
  { label: "Số điểm", value: "point_count" },
  { label: "Lương điểm", value: "point_salary" },
  { label: "Phí thu hồi", value: "recovery_fee" },
  { label: "Lương bốc xếp", value: "loading_salary" },
  { label: "Tiền ăn", value: "meal_fee" },
  { label: "Tiền lưu ca", value: "standby_fee" },
  { label: "Vé bãi", value: "parking_fee" },
  { label: "Lương khác", value: "other_salary" },
  { label: "Phí dầu ngoài", value: "outside_oil_fee" },
  { label: "Phí dầu", value: "oil_fee" },
  { label: "Thu cước", value: "charge_fee" },
  { label: "Ghi chú", value: "notes" },
  { label: "Thực lĩnh", value: "final_salary" },
];
