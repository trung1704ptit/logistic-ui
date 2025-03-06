import { BreadcrumbProps } from "antd";
import { Link } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import TruckList from "@/components/truckList";
import BasePageContainer from "@/components/layout/pageContainer";

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
    {
      key: webRoutes.trucks,
      title: <Link to={webRoutes.trucks}>Xe tải</Link>,
    },
  ],
};

const TruckListPage = () => {
  const trucks = useSelector((root: RootState) => root.truck.trucks);

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <TruckList trucks={trucks} />
    </BasePageContainer>
  );
};

export default TruckListPage;
