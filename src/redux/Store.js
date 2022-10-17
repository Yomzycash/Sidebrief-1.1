import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "services/authService";
import { launchApi } from "services/launchService";
import { RewardApi } from "services/RewardService";
import {
  LaunchReducer,
  LayoutInfoReducer,
  NotificationReducer,
  RegisteredBusinessesReducers,
  RewardReducer,
  UserDataReducer,
} from "./Slices";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [launchApi.reducerPath]: launchApi.reducer,
    [RewardApi.reducerPath]: RewardApi.reducer,
    UserDataReducer: UserDataReducer,
    LayoutInfo: LayoutInfoReducer,
    RegisteredBusinessesInfo: RegisteredBusinessesReducers,
    LaunchReducer: LaunchReducer,
    RewardReducer: RewardReducer,
    NotificationInfo: NotificationReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      launchApi.middleware,
      RewardApi.middleware,
    ]),
});

setupListeners(store.dispatch);
