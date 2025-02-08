import { webRoutes } from "@/routes/web";
import {
  BsFlag,
  BsPersonPlus,
  BsPeople,
  BsHouse,
  BsCart,
  BsCurrencyDollar,
  BsTruck,
  BsBuildingCheck,
} from "react-icons/bs";

export const sidebar = [
  {
    path: webRoutes.dashboard,
    key: webRoutes.dashboard,
    name: "Tổng quan",
    icon: <BsHouse />,
  },
  {
    path: webRoutes.orders,
    key: webRoutes.orders,
    name: "Đơn hàng",
    icon: <BsCart />,
  },
  {
    path: webRoutes.payslip,
    key: webRoutes.payslip,
    name: "Bảng lương",
    icon: <BsCurrencyDollar />,
  },
  {
    path: webRoutes.drivers,
    key: webRoutes.drivers,
    name: "Tài xế",
    icon: <BsPeople />,
  },
  {
    path: webRoutes.contractors,
    key: webRoutes.contractors,
    name: "Nhà thầu",
    icon: <BsBuildingCheck />,
  },
  {
    path: webRoutes.trucks,
    key: webRoutes.trucks,
    name: "Xe tải",
    icon: <BsTruck />,
  },
  {
    path: webRoutes.clients,
    key: webRoutes.clients,
    name: "Nhãn hàng",
    icon: <BsFlag />,
  },
  // {
  //   path: webRoutes.settings,
  //   key: webRoutes.settings,
  //   name: "Cài đặt",
  //   icon: <BsTools />,
  // },
  {
    path: webRoutes.users,
    key: webRoutes.users,
    name: "Tài khoản",
    icon: <BsPersonPlus />,
  },
];
