import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminSlice, { AdminState } from "@/store/slices/adminSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import contractorSlice, { ContractorState } from "./slices/contractorSlice";
import truckSlice, { TruckState } from "./slices/truckSlice";
import driverSlice, { DriverState } from "./slices/driverSlice";
import orderSlice, { OrderState } from "./slices/orderSlice";
import clientSlice, { ClientState } from "./slices/clientSlice";

const persistConfig = {
  key: CONFIG.appName,
  storage,
  blacklist: ["contractor", "driver", "truck", "order", "client"],
};

const rootReducer = combineReducers({
  admin: adminSlice,
  contractor: contractorSlice,
  truck: truckSlice,
  driver: driverSlice,
  order: orderSlice,
  client: clientSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = {
  admin: AdminState;
  contractor: ContractorState;
  truck: TruckState;
  driver: DriverState;
  order: OrderState;
  client: ClientState;
};
export type AppDispatch = typeof store.dispatch;
