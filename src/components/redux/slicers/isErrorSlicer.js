import { createSlice } from "@reduxjs/toolkit";

const isErrorSlicer = createSlice({
  name: "isError",
  initialState: false,
  reducers: {
    setIsError: (state, action) => {
      return action.payload;
    },
  },
});

export const { setIsError } = isErrorSlicer.actions;
export default isErrorSlicer.reducer;
