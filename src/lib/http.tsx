import { Store } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/store";
import { logout } from "@/store/slices/adminSlice";

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

http.interceptors.request.use(
  (config) => {
    const state: RootState = store.getState();
    const apiToken = state.admin?.token;

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
  (error) => {
    if (error?.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default http;
