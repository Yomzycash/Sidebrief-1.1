import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "services/authService";
import { launchApi } from "services/launchService";
import { RewardApi } from "services/RewardService";
import { staffApi } from "services/staffService";
import {
	LaunchReducer,
	LayoutInfoReducer,
	NotificationReducer,
	BusinessesReducers,
	RewardReducer,
	UserDataReducer,
} from "./Slices";

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[launchApi.reducerPath]: launchApi.reducer,
		[RewardApi.reducerPath]: RewardApi.reducer,
		[staffApi.reducerPath]: staffApi.reducer,
		UserDataReducer: UserDataReducer,
		LayoutInfo: LayoutInfoReducer,
		BusinessesInfo: BusinessesReducers,
		LaunchReducer: LaunchReducer,
		RewardReducer: RewardReducer,
		NotificationInfo: NotificationReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			authApi.middleware,
			launchApi.middleware,
			RewardApi.middleware,
			staffApi.middleware,
		]),
});

setupListeners(store.dispatch);
