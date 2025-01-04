import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITruck } from "@/interfaces/truck"; // Replace with the correct interface for a Truck
import { AppDispatch } from "@/store"; // Path to your store
import http from "@/lib/http";

export interface TruckState {
  trucks: ITruck[];
  loading: boolean;
  error: string | null;
}

const initialState: TruckState = {
  trucks: [],
  loading: false,
  error: null,
};

const truckSlice = createSlice({
  name: "truck",
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<ITruck[]>) {
      state.trucks = action.payload;
      state.loading = false;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addTruck(state, action: PayloadAction<ITruck>) {
      state.trucks.push(action.payload); // Add new truck to the list
    },
    updateTruck(state, action: PayloadAction<ITruck>) {
      const index = state.trucks.findIndex(
        (truck) => truck.id === action.payload.id
      );
      if (index !== -1) {
        state.trucks[index] = action.payload; // Update existing truck
      }
    },
    deleteTruck(state, action: PayloadAction<string>) {
      state.trucks = state.trucks.filter(
        (truck) => truck.id !== action.payload
      ); // Remove truck by ID
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  addTruck,
  updateTruck,
  deleteTruck,
} = truckSlice.actions;

// Define the thunk for fetching trucks
export const fetchTrucks = () => async (dispatch: AppDispatch) => {
  dispatch(fetchStart());
  try {
    const response = await http.get("/trucks"); // Replace with your API endpoint for trucks
    dispatch(fetchSuccess(response.data.data));
  } catch (error) {
    dispatch(
      fetchFailure(error instanceof Error ? error.message : "Unknown error")
    );
  }
};

// Define thunks for adding, updating, and deleting trucks if needed
export const addNewTruck = (truck: ITruck) => async (dispatch: AppDispatch) => {
  try {
    const response = await http.post("/trucks", truck); // Endpoint to add a new truck
    dispatch(addTruck(response.data.data));
  } catch (error) {
    dispatch(
      fetchFailure(error instanceof Error ? error.message : "Unknown error")
    );
  }
};

export const updateTruckDetails =
  (truck: ITruck) => async (dispatch: AppDispatch) => {
    try {
      const response = await http.put(`/trucks/${truck.id}`, truck); // Endpoint to update truck details
      dispatch(updateTruck(response.data.data));
    } catch (error) {
      dispatch(
        fetchFailure(error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

export const removeTruck =
  (truckId: string) => async (dispatch: AppDispatch) => {
    try {
      await http.delete(`/trucks/${truckId}`); // Endpoint to delete a truck
      dispatch(deleteTruck(truckId));
    } catch (error) {
      dispatch(
        fetchFailure(error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

export default truckSlice.reducer;
