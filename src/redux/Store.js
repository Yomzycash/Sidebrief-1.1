import { configureStore } from "@reduxjs/toolkit";
import { UserDataReducer } from "./Slices";

const store = configureStore({
  reducer: {
    UserData: UserDataReducer,
  },
});

export default store;
