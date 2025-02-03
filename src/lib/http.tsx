import { Store } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/store";
import { logout, login } from "@/store/slices/adminSlice";

let store: Store;

export const injectStore = (_store: Store) => {
  store = _store;
};

export const defaultHttp = axios.create();
const http = axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_API_URL || "https://localhost:8000.com/api", // Replace with your API's base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// A variable to track the refresh token request status
let isRefreshing = false;
// A queue to hold requests while the token is being refreshed
let requestQueue: Array<(token: string) => void> = [];

// Function to process queued requests
const processQueue = (error: any, token: string | null = null) => {
  requestQueue.forEach((promise) => {
    if (token) {
      promise(token);
    } else {
      promise(error);
    }
  });
  requestQueue = [];
};

http.interceptors.request.use(
  (config) => {
    const state: RootState = store.getState();
    const apiToken = state.admin?.access_token;

    if (apiToken) {
      config.headers.Authorization = `Bearer ${apiToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const state: RootState = store.getState();
          const refreshToken = state.admin?.refresh_token;

          const refreshResponse = await defaultHttp.post(
            `${http.defaults.baseURL}/auth/refresh`,
            { refresh_token: refreshToken }
          );

          const accessToken = refreshResponse.data.access_token;
          store.dispatch(
            login({ access_token: accessToken, refresh_token: refreshToken })
          );

          isRefreshing = false;
          processQueue(null, accessToken);

          return http(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          processQueue(refreshError, null);
          store.dispatch(logout());
          return Promise.reject(refreshError);
        }
      }

      // Queue the current request while waiting for the token to refresh
      return new Promise((resolve, reject) => {
        requestQueue.push((token: string | null) => {
          if (token) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(http(originalRequest));
          } else {
            reject(error);
          }
        });
      });
    }

    if (
      error?.response?.status === 403 &&
      error?.response?.data?.message?.includes("no logger exists")
    ) {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);

export default http;
