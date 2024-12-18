import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '@/components/layout/authLayout';
import ErrorPage from '@/pages/errors/errorPage';
import Layout from '@/components/layout';
import Redirect from '@/components/layout/redirect';
import NotFoundPage from '@/pages/errors/notfoundPage';
import { webRoutes } from '@/routes/web';
import loadable from '@loadable/component';
import ProgressBar from '@/components/loader/progressBar';
import RequireAuth from '@/routes/requireAuth';
import LoginPage from '@/pages/auth/loginPage';

const errorElement = <ErrorPage />;
const fallbackElement = <ProgressBar />;

const DashboardPage = loadable(() => import('@/pages/dashboardPage'), {
  fallback: fallbackElement,
});
const UserListPage = loadable(() => import('@/pages/users/userListPage'), {
  fallback: fallbackElement,
});
const DriverListPage = loadable(() => import('@/pages/drivers/driverListPage'), {
  fallback: fallbackElement,
});
const AddNewDriverPage = loadable(() => import('@/pages/drivers/addNewDriverPage'), {
  fallback: fallbackElement,
});
const UpdateDriverPage = loadable(() => import('@/pages/drivers/updateDriverPage'), {
  fallback: fallbackElement,
});
const TruckListPage = loadable(() => import('@/pages/trucks/truckPage'), {
  fallback: fallbackElement,
});
const ReportPage = loadable(() => import('@/pages/reports/reportPage'), {
  fallback: fallbackElement,
});
const SalaryPage  = loadable(() => import('@/pages/salaries/salaryPage'), {
  fallback: fallbackElement,
});
const PriceListPage  = loadable(() => import('@/pages/prices/pricePage'), {
  fallback: fallbackElement,
});

const SettingPage  = loadable(() => import('@/pages/settings/settingPage'), {
  fallback: fallbackElement,
});

// Contractors
const ContractorListPage  = loadable(() => import('@/pages/contractors/contractorListPage'), {
  fallback: fallbackElement,
});

const NewContractorPage  = loadable(() => import('@/pages/contractors/newContractorPage'), {
  fallback: fallbackElement,
});

const UpdateContractorPage  = loadable(() => import('@/pages/contractors/updateContractorPage'), {
  fallback: fallbackElement,
});

export const browserRouter = createBrowserRouter([
  {
    path: webRoutes.home,
    element: <Redirect />,
    errorElement: errorElement,
  },

  // auth routes
  {
    element: <AuthLayout />,
    errorElement: errorElement,
    children: [
      {
        path: webRoutes.login,
        element: <LoginPage />,
      },
    ],
  },

  // protected routes
  {
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    errorElement: errorElement,
    children: [
      {
        path: webRoutes.dashboard,
        element: <DashboardPage />,
      },
      {
        path: webRoutes.orders,
        element: <DriverListPage />,
      },
      {
        path: webRoutes.drivers,
        element: <DriverListPage />,
      },
      {
        path: webRoutes.addNewDrivers,
        element: <AddNewDriverPage />,
      },
      {
        path: webRoutes.updateDrivers,
        element: <UpdateDriverPage />,
      },
      {
        path: webRoutes.trucks,
        element: <TruckListPage />,
      },
      {
        path: webRoutes.reports,
        element: <ReportPage />,
      },
      {
        path: webRoutes.salaries,
        element: <SalaryPage />,
      },
      {
        path: webRoutes.settings,
        element: <SettingPage/>,
      },
      {
        path: webRoutes.prices,
        element: <PriceListPage/>,
      },
      {
        path: webRoutes.users,
        element: <UserListPage />,
      },
      {
        path: webRoutes.expenses,
        element: <UserListPage />,
      },
      {
        path: webRoutes.contractors,
        element: <ContractorListPage />,
      },
      {
        path: webRoutes.addNewContractors,
        element: <NewContractorPage />,
      },
      {
        path: webRoutes.updateContractors,
        element: <UpdateContractorPage />,
      },
    ],
  },

  // 404
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: errorElement,
  },
]);
