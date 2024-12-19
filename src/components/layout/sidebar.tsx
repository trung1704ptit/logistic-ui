import { webRoutes } from "@/routes/web";
import { BiHomeAlt2 } from "react-icons/bi";
import { LiaHandshake } from "react-icons/lia";
import Icon, {
  UserOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  LineChartOutlined,
  DollarOutlined,
  CopyOutlined,
  TruckOutlined,
  FormOutlined
} from "@ant-design/icons";

export const sidebar = [
  {
    path: webRoutes.dashboard,
    key: webRoutes.dashboard,
    name: "Tổng quan",
    icon: <Icon component={BiHomeAlt2} />,
  },
  {
    path: webRoutes.orders,
    key: webRoutes.orders,
    name: "Đơn hàng",
    icon: <Icon component={LiaHandshake} />,
  },
  {
    path: webRoutes.expenses,
    key: webRoutes.expenses,
    name: "Chi phí",
    icon: <FormOutlined />,
  },
  {
    path: webRoutes.prices,
    key: webRoutes.prices,
    name: "Bảng giá",
    icon: <CopyOutlined />,
  },
  {
    path: webRoutes.salaries,
    key: webRoutes.salaries,
    name: "Bảng lương",
    icon: <DollarOutlined />,
  },
  {
    path: webRoutes.drivers,
    key: webRoutes.drivers,
    name: "Tài xế",
    icon: <UserOutlined />,
  },
  {
    path: webRoutes.trucks,
    key: webRoutes.trucks,
    name: "Xe tải",
    icon: <TruckOutlined />,
  },
  {
    path: webRoutes.reports,
    key: webRoutes.reports,
    name: "Báo cáo",
    icon: <LineChartOutlined />,
  },
  {
    path: webRoutes.settings,
    key: webRoutes.settings,
    name: "Cài đặt",
    icon: <SettingOutlined />,
  },
  {
    path: webRoutes.users,
    key: webRoutes.users,
    name: "Tài khoản",
    icon: <UserOutlined />,
  },
];
