import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { webRoutes } from '@/routes/web';
import { Dropdown } from 'antd';
import { ProLayout, ProLayoutProps } from '@ant-design/pro-components';
import Icon, { LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/adminSlice';
import { memo, useEffect } from 'react';
import { sidebar } from '@/components/layout/sidebar';
import { apiRoutes } from '@/routes/api';
import http from '@/lib/http';
import { handleErrorResponse } from '@/lib/utils';
import { RiShieldUserFill } from 'react-icons/ri';
import { AppDispatch } from "@/store";
import { fetchTrucks } from '@/store/slices/truckSlice';
import { fetchContractors } from '@/store/slices/contractorSlice';


const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appDispatch = useDispatch<AppDispatch>();
  const dispatch = useDispatch();

  const defaultProps: ProLayoutProps = {
    title: CONFIG.appName,
    pageTitleRender(props, defaultPageTitle) {
      return `${defaultPageTitle} - ${CONFIG.appName}`;
    },
    logo: '/icon.png',
    fixedHeader: true,
    fixSiderbar: true,
    layout: CONFIG.theme.sidebarLayout,
    route: {
      routes: sidebar,
    },
  };

  const logoutAdmin = async () => {
    await http.get(apiRoutes.logout).catch((error) => {
      handleErrorResponse(error);
    });
    navigate(webRoutes.login, {
      replace: true,
    });
    dispatch(logout());
  };


  useEffect(() => {
    appDispatch(fetchContractors());
    appDispatch(fetchTrucks());
  }, [appDispatch]);

  return (
    <div className="h-screen">
      <ProLayout
        {...defaultProps}
        token={{
          sider: {
            colorMenuBackground: 'white',
            colorBgMenuItemSelected: '#ccebcc',
          },
        }}
        location={location}
        onMenuHeaderClick={() => navigate(webRoutes.dashboard)}
        menuItemRender={(item, dom) => (
          <a
            onClick={(e) => {
              e.preventDefault();
              item.path && navigate(item.path);
            }}
            href={item.path}
          >
            {dom}
          </a>
        )}
        avatarProps={{
          icon: <Icon component={RiShieldUserFill} />,
          className:
            'bg-rfprimary bg-opacity-20 text-rfprimary text-opacity-90',
          size: 'small',
          shape: 'square',
          title: 'Admin',
          render: (_, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'logout',
                      icon: <LogoutOutlined />,
                      label: 'Logout',
                      onClick: () => {
                        logoutAdmin();
                      },
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
      >
        <Outlet />
      </ProLayout>
    </div>
  );
};

export default memo(Layout);
