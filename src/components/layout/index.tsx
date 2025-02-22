import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { webRoutes } from "@/routes/web";
import { Dropdown } from "antd";
import { ProLayout, ProLayoutProps } from "@ant-design/pro-components";
import Icon, { LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/adminSlice";
import { memo, useEffect } from "react";
import { sidebar } from "@/components/layout/sidebar";
import { apiRoutes } from "@/routes/api";
import http from "@/lib/http";
import { handleErrorResponse } from "@/lib/utils";
import { RiShieldUserFill } from "react-icons/ri";
import { AppDispatch, RootState } from "@/store";
import { fetchTrucks } from "@/store/slices/truckSlice";
import { fetchContractors } from "@/store/slices/contractorSlice";
import { fetchDrivers } from "@/store/slices/driverSlice";
import { fetchClients } from "@/store/slices/clientSlice";
import { fetchSettings } from "@/store/slices/settingSlice";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appDispatch = useDispatch<AppDispatch>();
  const dispatch = useDispatch();
  const userProfile = useSelector(
    (state: RootState) => state.admin?.user_profile
  );

  const defaultProps: ProLayoutProps = {
    title: CONFIG.appName,
    pageTitleRender(props, defaultPageTitle) {
      return `${defaultPageTitle} - ${CONFIG.appName}`;
    },
    logo: "/icon.png",
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
    appDispatch(fetchDrivers());
    appDispatch(fetchClients());
    appDispatch(fetchSettings());
  }, [appDispatch]);

  return (
    <div className="h-screen">
      <ProLayout
        {...defaultProps}
        siderWidth={180} 
        token={{
          sider: {
            colorMenuBackground: "white",
            colorBgMenuItemSelected: "#ccebcc",
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
            "bg-rfprimary bg-opacity-20 text-rfprimary text-opacity-90",
          size: "small",
          shape: "square",
          title: userProfile ? userProfile.name : "Admin",
          render: (_, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "Đăng xuất",
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
