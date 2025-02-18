import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "@/store";
import http from "@/lib/http";
import { apiRoutes } from "@/routes/api";

export interface SettingState {
  settings: ISetting;
  loading: boolean;
  error: string | null;
}

const initialState: SettingState = {
  settings: {
    kpi_threshold: 0,
    kpi_bonus: 0,
    vat: 0,
  },
  loading: false,
  error: null,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<ISetting>) {
      state.settings = action.payload;
      state.loading = false;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = settingSlice.actions;

export const fetchSettings = () => async (dispatch: AppDispatch) => {
  dispatch(fetchStart());
  try {
    const res = await http.get(apiRoutes.settings);
    if (res?.data?.data?.settings) {
      dispatch(fetchSuccess(res.data.data.settings));
    }
  } catch (error) {
    dispatch(
      fetchFailure(error instanceof Error ? error.message : "Unknown error")
    );
  }
};

export const updateSettings =
  (payload: { settings: ISetting }) => async (dispatch: AppDispatch) => {
    dispatch(fetchStart());
    try {
      const res = await http.post(apiRoutes.settings, payload);
      if (res?.data?.data?.settings) {
        dispatch(fetchSuccess(res.data.data.settings));
      }
    } catch (error) {
      dispatch(
        fetchFailure(error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

export default settingSlice.reducer;
