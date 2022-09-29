import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "services/authService";
import { launchApi } from "services/launchService";
import { RewardApi } from "services/RewardService";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {
  LaunchReducer,
  LayoutInfoReducer,
  RegisteredBusinessesReducers,
  RewardReducer,
  UserDataReducer,
} from "./Slices";
import persistStore from "redux-persist/es/persistStore";

// const persistConfig = {
//   key: "root",
//   storage,
//   stateReconciler: autoMergeLevel2,
// };
// const rootReducer = combineReducers({
//   [authApi.reducerPath]: authApi.reducer,
//   [launchApi.reducerPath]: launchApi.reducer,
//   [RewardApi.reducerPath]: RewardApi.reducer,
//   UserDataReducer: UserDataReducer,
//   LayoutInfo: LayoutInfoReducer,
//   RegisteredBusinessesInfo: RegisteredBusinessesReducers,
//   LaunchReducer: LaunchReducer,
//   RewardReducer: RewardReducer,
// });

// const persistedReducer = persistedReducer(persistConfig, rootReducer);

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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      launchApi.middleware,
      RewardApi.middleware,
    ]),
});

setupListeners(store.dispatch);

// export const persistor = persistStore(store);
