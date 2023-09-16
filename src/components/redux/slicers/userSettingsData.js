import { createSlice } from "@reduxjs/toolkit";

const userSettingsData = createSlice({
  name: "userData",
  initialState: false,
  reducers: {
    setUserData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUserData } = userSettingsData.actions;
export default userSettingsData.reducer;
