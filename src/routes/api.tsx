export const BACKEND_API_URL =
  import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8000/api';

export const apiRoutes = {
  login: `${BACKEND_API_URL}/auth/login`,
  logout: `${BACKEND_API_URL}/auth/logout`,
  register: `${BACKEND_API_URL}/auth/register`,
  users: `${BACKEND_API_URL}/users`,
  reviews: `${BACKEND_API_URL}/unknown`,
  drivers: `${BACKEND_API_URL}/drivers`,
  files: `${BACKEND_API_URL}/files`,
  prices: `${BACKEND_API_URL}/prices`,
  orders: `${BACKEND_API_URL}/orders`,
  payslips: `${BACKEND_API_URL}/payslips`,
  clients: `${BACKEND_API_URL}/clients`,
};
