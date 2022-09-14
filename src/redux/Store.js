import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "services/authService";
import { launchApi } from "services/launchService";
import {
  LaunchReducer,
  LayoutInfoReducer,
  RegisteredBusinessesReducers,
  UserDataReducer,
} from "./Slices";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    UserDataReducer: UserDataReducer,
    LayoutInfo: LayoutInfoReducer,
    RegisteredBusinessesInfo: RegisteredBusinessesReducers,
    [launchApi.reducerPath]: launchApi.reducer,
    LaunchReducer: LaunchReducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   getDefaultMiddleware().concat(authApi.middleware);
  // }
});
setupListeners(store.dispatch);
