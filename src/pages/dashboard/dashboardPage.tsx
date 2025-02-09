import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Col, Row } from "antd";
import { webRoutes } from "@/routes/web";
import { Link } from "react-router-dom";
import StatCard from "@/components/dashboard/statCard";
import Icon from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { BsBuildingCheck, BsTruck, BsPeople, BsFlag } from "react-icons/bs";
import OrderGraph from "@/components/orderGraph";

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
  ],
};

const DashboardPage = () => {
  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );
  const trucks = useSelector((state: RootState) => state.truck.trucks);
  const drivers = useSelector((state: RootState) => state.driver.drivers);
  const clients = useSelector((state: RootState) => state.client.clients);

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Row gutter={24}>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={false}
            icon={<Icon component={BsBuildingCheck} />}
            title="Nhà thầu"
            number={contractors.length}
          />
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={false}
            icon={<Icon component={BsTruck} />}
            title="Xe tải"
            number={trucks.length}
          />
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={false}
            icon={<Icon component={BsPeople} />}
            title="Tài xế"
            number={drivers.length}
          />
        </Col>

        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={false}
            icon={<Icon component={BsFlag} />}
            title="Nhãn hàng"
            number={clients.length}
          />
        </Col>
        <Col xs={24}>
          <OrderGraph />
        </Col>
      </Row>
    </BasePageContainer>
  );
};

export default DashboardPage;
