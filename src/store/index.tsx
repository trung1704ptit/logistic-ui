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

const persistConfig = {
  key: CONFIG.appName,
  storage,
  blacklist: ["contractor", "driver", "truck"],
};

const rootReducer = combineReducers({
  admin: adminSlice,
  contractor: contractorSlice,
  truck: truckSlice,
  driver: driverSlice,
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
};
export type AppDispatch = typeof store.dispatch;
