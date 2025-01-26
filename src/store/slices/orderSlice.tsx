import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "@/store";
import http from "@/lib/http";
import { IOrder } from "@/interfaces/order";
import { apiRoutes } from "@/routes/api";

export interface OrderState {
  orders: IOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<IOrder[]>) {
      state.orders = action.payload;
      state.loading = false;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = orderSlice.actions;

// Define the thunk here for fetching orders
export const fetchOrders = (year: number, month: number) => async (dispatch: AppDispatch) => {
  dispatch(fetchStart());
  try {
    const res = await http.get(
        `${apiRoutes.orders}?year=${year}&month=${month}`
      );
    dispatch(fetchSuccess(res.data.data));
  } catch (error) {
    dispatch(
      fetchFailure(error instanceof Error ? error.message : "Unknown error")
    );
  }
};

export default orderSlice.reducer;
