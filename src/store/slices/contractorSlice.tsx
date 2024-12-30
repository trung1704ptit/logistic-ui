import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContractor } from "@/interfaces/contractor";
import { AppDispatch } from "@/store"; // Replace with the path to your store
import http from "@/lib/http";

export interface ContractorState {
  contractors: IContractor[];
  loading: boolean;
  error: string | null;
}

const initialState: ContractorState = {
  contractors: [],
  loading: false,
  error: null,
};

const contractorSlice = createSlice({
  name: "contractor",
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<IContractor[]>) {
      state.contractors = action.payload;
      state.loading = false;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } =
  contractorSlice.actions;

// Define the thunk here
export const fetchContractors = () => async (dispatch: AppDispatch) => {
  dispatch(fetchStart());
  try {
    const response = await http.get("/contractors"); // Replace with your API endpoint
    dispatch(fetchSuccess(response.data.data));
  } catch (error) {
    dispatch(
      fetchFailure(error instanceof Error ? error.message : "Unknown error")
    );
  }
};

export default contractorSlice.reducer;
