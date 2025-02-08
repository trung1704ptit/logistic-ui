import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IClient } from "@/interfaces/client"; // Replace with the correct interface for a Client
import { AppDispatch } from "@/store"; // Path to your store
import http from "@/lib/http"; // Assuming you have an http helper
import { apiRoutes } from "@/routes/api";

export interface ClientState {
  clients: IClient[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<IClient[]>) {
      state.clients = action.payload;
      state.loading = false;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addClient(state, action: PayloadAction<IClient>) {
      state.clients.push(action.payload); // Add new client to the list
    },
    updateClient(state, action: PayloadAction<IClient>) {
      const index = state.clients.findIndex(
        (client) => client.id === action.payload.id
      );
      if (index !== -1) {
        state.clients[index] = action.payload; // Update existing client
      }
    },
    deleteClient(state, action: PayloadAction<string>) {
      state.clients = state.clients.filter(
        (client) => client.id !== action.payload
      );
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  addClient,
  updateClient,
  deleteClient,
} = clientSlice.actions;

// Define the thunk for fetching clients
export const fetchClients = () => async (dispatch: AppDispatch) => {
  dispatch(fetchStart());
  try {
    const response = await http.get(apiRoutes.clients); // Replace with your API endpoint for clients
    dispatch(fetchSuccess(response.data.data));
  } catch (error) {
    dispatch(
      fetchFailure(error instanceof Error ? error.message : "Unknown error")
    );
  }
};

// Define thunks for adding, updating, and deleting clients if needed
export const addNewClient =
  (client: IClient) => async (dispatch: AppDispatch) => {
    try {
      const response = await http.post(apiRoutes.clients, client); // Endpoint to add a new client
      dispatch(addClient(response.data.data));
    } catch (error) {
      dispatch(
        fetchFailure(error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

export const updateClientDetails =
  (client: IClient) => async (dispatch: AppDispatch) => {
    try {
      const response = await http.put(
        `${apiRoutes.clients}/${client.id}`,
        client
      ); // Endpoint to update client details
      dispatch(updateClient(response.data.data));
    } catch (error) {
      dispatch(
        fetchFailure(error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

export const removeClient =
  (clientId: string) => async (dispatch: AppDispatch) => {
    try {
      await http.delete(`${apiRoutes.clients}/${clientId}`); // Endpoint to delete a client
      dispatch(deleteClient(clientId));
    } catch (error) {
      dispatch(
        fetchFailure(error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

export default clientSlice.reducer;
