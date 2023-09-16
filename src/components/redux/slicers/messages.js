import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  messages: [],
};
const messagesSlicer = createSlice({
  name: "messContainer",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      const { sender, text, time } = action.payload;

      const existingMessage = state.messages.find(
        (message) => message.time === time
      );
      if (!existingMessage) {
        state.messages.push({ sender, text, time });
      }
    },
  },
});

export const { setMessage } = messagesSlicer.actions;
export default messagesSlicer.reducer;
