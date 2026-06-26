import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendMessageApi } from "./aiAPI";

export const sendMessage = createAsyncThunk(
  "ai/sendMessage",
  async (message) => {
    const { data } = await sendMessageApi(message);
    return data.result;
  },
);
const aiSlice = createSlice({
  name: "ai",

  initialState: {
    messages: [],

    loading: false,
  },

  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({
        role: "user",

        content: action.payload,
      });
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        sendMessage.pending,

        (state) => {
          state.loading = true;
        },
      )

      .addCase(sendMessage.fulfilled, (state, action) => {
  

        state.loading = false;

        state.messages.push({
          role: "assistant",
          content:
            typeof action.payload === "string"
              ? action.payload
              : JSON.stringify(action.payload, null, 2),
        });
      })

      .addCase(sendMessage.rejected, (state, action) => {
    

        state.loading = false;

        state.messages.push({
          role: "assistant",
          content: "Something went wrong.",
        });
      });
  },
});

export const { addUserMessage } = aiSlice.actions;
export default aiSlice.reducer;
