import { combineReducers, configureStore } from "@reduxjs/toolkit";
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

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[launchApi.reducerPath]: launchApi.reducer,
	[RewardApi.reducerPath]: RewardApi.reducer,
	UserDataReducer: UserDataReducer,
	LayoutInfo: LayoutInfoReducer,
	RegisteredBusinessesInfo: RegisteredBusinessesReducers,
	LaunchReducer: LaunchReducer,
	RewardReducer: RewardReducer,
});

export const store = configureStore({
	reducer: rootReducer,

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			authApi.middleware,
			launchApi.middleware,
			RewardApi.middleware,
			save({
				ignoreStates: [
					"launchApi.reducerPath",
					"authApi.reducerPath",
					"RewardApi.reducerPath",
				],
			}),
		]),
	preloadedState: load(),
});

setupListeners(store.dispatch);
