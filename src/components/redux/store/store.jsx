import { configureStore } from "@reduxjs/toolkit";
import isErrorSlicer from "../slicers/isErrorSlicer";
import isAuthSlicer from "../slicers/isAuthenticated";
import userSettingsData from "../slicers/userSettingsData";
import messagesSlicer from "../slicers/messages";
const store = configureStore({
  reducer: {
    isError: isErrorSlicer,
    isAuth: isAuthSlicer,
    userData: userSettingsData,
    messages: messagesSlicer,
  },
});

export default store;
