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
const TruckListPage = loadable(() => import('@/pages/trucks/truckListPage'), {
  fallback: fallbackElement,
});
const NewTruckPage = loadable(() => import('@/pages/trucks/newTruckPage'), {
  fallback: fallbackElement,
});
const UpdateTruckPage = loadable(() => import('@/pages/trucks/updateTruckPage'), {
  fallback: fallbackElement,
});
const ReportPage = loadable(() => import('@/pages/reports/reportPage'), {
  fallback: fallbackElement,
});
const PayslipPage  = loadable(() => import('@/pages/payslips/payslipPage'), {
  fallback: fallbackElement,
});

// Prices
const PriceListPage  = loadable(() => import('@/pages/prices/priceListPage'), {
  fallback: fallbackElement,
});

// const AddPricePage  = loadable(() => import('@/pages/prices/'), {
//   fallback: fallbackElement,
// });

// const UpdatePricePage  = loadable(() => import('@/pages/prices/updatePricePage'), {
//   fallback: fallbackElement,
// });

// const AddPriceExcelPage  = loadable(() => import('@/pages/prices/addPriceExcelPage'), {
//   fallback: fallbackElement,
// });


// -----------------------

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

// Orders
const OrderListPage  = loadable(() => import('@/pages/orders/orderListPage'), {
  fallback: fallbackElement,
});

const AddNewOrderPage  = loadable(() => import('@/pages/orders/newOrderPage'), {
  fallback: fallbackElement,
});

const UpdateOrderPage  = loadable(() => import('@/pages/orders/updateOrderPage'), {
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
        element: <OrderListPage />,
      },
      {
        path: webRoutes.addNewOrder,
        element: <AddNewOrderPage />,
      },
      {
        path: webRoutes.updateOrder,
        element: <UpdateOrderPage />,
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
        path: webRoutes.addNewTruck,
        element: <NewTruckPage />,
      },
      {
        path: webRoutes.updateTruck,
        element: <UpdateTruckPage />,
      },
      {
        path: webRoutes.reports,
        element: <ReportPage />,
      },
      {
        path: webRoutes.payslip,
        element: <PayslipPage />,
      },
      {
        path: webRoutes.settings,
        element: <SettingPage/>,
      },
      {
        path: webRoutes.prices,
        element: <PriceListPage/>,
      },
      // {
      //   path: webRoutes.addNewPrice,
      //   element: <AddPricePage/>,
      // },
      // {
      //   path: webRoutes.addNewPriceExcel,
      //   element: <AddPriceExcelPage/>,
      // },
      // {
      //   path: webRoutes.updatePrice,
      //   element: <UpdatePricePage/>,
      // },
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
