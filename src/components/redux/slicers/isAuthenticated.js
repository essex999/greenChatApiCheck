import { createSlice } from "@reduxjs/toolkit";

const isAuthSlicer = createSlice({
  name: "isAuth",
  initialState: false,
  reducers: {
    setIsAuth: (state, action) => {
      return action.payload;
    },
  },
});

export const { setIsAuth } = isAuthSlicer.actions;
export default isAuthSlicer.reducer;
