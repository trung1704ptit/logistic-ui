import { Link } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BreadcrumbProps } from "antd";
import DriverList from "@/components/driverList";
import BasePageContainer from "@/components/layout/pageContainer";

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
    {
      key: webRoutes.drivers,
      title: <Link to={webRoutes.drivers}>Tài xế</Link>,
    },
  ],
};

const DriverListPage = () => {
  const drivers = useSelector((state: RootState) => state.driver.drivers);

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <DriverList drivers={drivers} />
    </BasePageContainer>
  );
};

export default DriverListPage;
