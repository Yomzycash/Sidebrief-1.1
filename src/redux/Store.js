import {
  applyMiddleware,
  combineReducers,
  configureStore,
  createStore,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "services/authService";
import { launchApi } from "services/launchService";
import { RewardApi } from "services/RewardService";
import {
  LaunchReducer,
  LayoutInfoReducer,
  RegisteredBusinessesReducers,
  RewardReducer,
  UserDataReducer,
} from "./Slices";
import { save, load } from "redux-localstorage-simple";

// export const store = configureStore({
//   reducer: {
//     [authApi.reducerPath]: authApi.reducer,
//     [launchApi.reducerPath]: launchApi.reducer,
//     [RewardApi.reducerPath]: RewardApi.reducer,
//     UserDataReducer: UserDataReducer,
//     LayoutInfo: LayoutInfoReducer,
//     RegisteredBusinessesInfo: RegisteredBusinessesReducers,
//     LaunchReducer: LaunchReducer,
//     RewardReducer: RewardReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat([
//       authApi.middleware,
//       launchApi.middleware,
//       RewardApi.middleware,
//     ]),
// });

// setupListeners(store.dispatch);

// export const persistor = persistStore(store);
// const createStoreWithMiddleWare = applyMiddleware(save())(configureStore);

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
