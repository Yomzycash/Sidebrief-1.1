import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "services/authService";
import { launchApi } from "services/launchService";
import { RewardApi } from "services/RewardService";
import { staffApi } from "services/staffService";
import { ChatApi } from "services/chatService";
import { ComplyApi } from "services/complyService";
import { serviceApi } from "services/productService";
import { vendorApi } from "services/vendorService";

import {
  LaunchReducer,
  LayoutInfoReducer,
  NotificationReducer,
  BusinessesReducers,
  RewardReducer,
  UserDataReducer,
  ServiceReducer,
} from "./Slices";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [launchApi.reducerPath]: launchApi.reducer,
    [RewardApi.reducerPath]: RewardApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
    [ChatApi.reducerPath]: ChatApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [ComplyApi.reducerPath]: ComplyApi.reducer,
    [vendorApi.reducerPath]: vendorApi.reducer,
    UserDataReducer: UserDataReducer,
    LayoutInfo: LayoutInfoReducer,
    BusinessesInfo: BusinessesReducers,
    LaunchReducer: LaunchReducer,
    RewardReducer: RewardReducer,
    NotificationInfo: NotificationReducer,
    ServiceReducer: ServiceReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      launchApi.middleware,
      RewardApi.middleware,
      staffApi.middleware,
      ChatApi.middleware,
      ComplyApi.middleware,
      vendorApi.middleware,
    ]),
});

setupListeners(store.dispatch);
