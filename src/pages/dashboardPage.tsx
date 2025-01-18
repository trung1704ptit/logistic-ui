import { useEffect, useState } from 'react';
import BasePageContainer from '@/components/layout/pageContainer';
import {
  Avatar,
  BreadcrumbProps,
  Card,
  Col,
  List,
  Progress,
  Rate,
  Row,
  Table,
  Tag,
} from 'antd';
import { webRoutes } from '@/routes/web';
import { Link } from 'react-router-dom';
import StatCard from '@/components/dashboard/statCard';
import { AiOutlineStar, AiOutlineTeam } from 'react-icons/ai';
import Icon from '@ant-design/icons';
import { BiCommentDetail, BiPhotoAlbum } from 'react-icons/bi';
import { MdOutlineArticle, MdOutlinePhoto } from 'react-icons/md';
import { StatisticCard } from '@ant-design/pro-components';
import LazyImage from '@/components/lazy-image';
import { User } from '@/interfaces/user';
import http from '@/lib/http';
import { apiRoutes } from '@/routes/api';
import { handleErrorResponse } from '@/lib/utils';
import { Review } from '@/interfaces/review';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Dashboard</Link>,
    },
  ],
};

const DashboardPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const contractors = useSelector((state: RootState) => state.contractor.contractors)
  const trucks = useSelector((state: RootState) => state.truck.trucks)
  const drivers = useSelector((state: RootState) => state.driver.drivers)

  return (
    <BasePageContainer breadcrumb={breadcrumb} transparent={true}>
      <Row gutter={24}>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={false}
            icon={<Icon component={AiOutlineTeam} />}
            title="Nhà thầu"
            number={contractors.length}
          />
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={false}
            icon={<Icon component={MdOutlineArticle} />}
            title="Xe tải"
            number={trucks.length}
          />
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={false}
            icon={<Icon component={BiPhotoAlbum} />}
            title="Tài xế"
            number={drivers.length}
          />
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={false}
            icon={<Icon component={MdOutlinePhoto} />}
            title="Đơn hàng"
            number={20}
          />
        </Col>
        <Col
          xl={12}
          lg={12}
          md={12}
          sm={24}
          xs={24}
          style={{ marginBottom: 24 }}
        >
          <Card bordered={false} className="w-full h-full cursor-default">
            <Table
              loading={loading}
              pagination={false}
              showHeader={false}
              dataSource={reviews}
              columns={[
                {
                  title: 'Title',
                  dataIndex: 'title',
                  key: 'title',
                  align: 'left',
                },
                {
                  title: 'Year',
                  dataIndex: 'year',
                  key: 'year',
                  align: 'center',
                  render: (_, row: Review) => (
                    <Tag color={row.color}>{row.year}</Tag>
                  ),
                },
                {
                  title: 'Star',
                  dataIndex: 'star',
                  key: 'star',
                  align: 'center',
                  render: (_, row: Review) => (
                    <Rate disabled defaultValue={row.star} />
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </BasePageContainer>
  );
};

export default DashboardPage;
