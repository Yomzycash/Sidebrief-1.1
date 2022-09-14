import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "services/authService";
import {
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
  },
  // middleware: (getDefaultMiddleware) => {
  //   getDefaultMiddleware().concat(authApi.middleware);
  // }
});

setupListeners(store.dispatch);
