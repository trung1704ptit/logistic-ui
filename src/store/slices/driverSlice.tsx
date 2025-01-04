import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "@/store"; // Replace with the path to your store
import http from "@/lib/http"; // Ensure this points to your HTTP utility for API requests
import { IDriver } from "@/interfaces/driver";

export interface DriverState {
  drivers: IDriver[];
  loading: boolean;
  error: string | null;
}

const initialState: DriverState = {
  drivers: [],
  loading: false,
  error: null,
};

const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<IDriver[]>) {
      state.drivers = action.payload;
      state.loading = false;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = driverSlice.actions;

// Define the thunk here for fetching drivers
export const fetchDrivers = () => async (dispatch: AppDispatch) => {
  dispatch(fetchStart());
  try {
    const response = await http.get("/drivers"); // Replace with your API endpoint for drivers
    dispatch(fetchSuccess(response.data.data));
  } catch (error) {
    dispatch(
      fetchFailure(error instanceof Error ? error.message : "Unknown error")
    );
  }
};

export default driverSlice.reducer;
