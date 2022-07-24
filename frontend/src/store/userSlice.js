import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  user: {
    user: localStorage.getItem("alienfood")
      ? JSON.parse(localStorage.getItem("alienfood"))
      : {},
  },
  status: "idle",
  error: null,
};
export const signIn = createAsyncThunk("user/get", async (userAuth) => {
  try {
    const user = await axios.post("/app/users/signin", userAuth);
    localStorage.setItem("alienfood", JSON.stringify(user.data));
    return { status: 200, user: user.data };
  } catch (error) {
    return { status: 401, user: null, error: error.message };
  }
});
export const signUp = createAsyncThunk("user/signup", async (userInfo) => {
  try {
    const response = await axios.post("/app/users/signup", userInfo);
    return { status: 200, user: response.data };
  } catch (error) {
    return { status: 401, user: null, error: error.message };
  }
});
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout(state, action) {
      state.user = {};
      state.error = null;
      state.status = "idle";
      localStorage.removeItem("alienfood");
      localStorage.removeItem("alienfoodCart");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "complete";
      })

      .addCase(signUp.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "complete";
      });
  },
});

export const getUser = (state) => state.user.user;
export const getUserError = (state) => state.user.error;
export const getUserStatus = (state) => state.user.status;
export const { userLogout } = userSlice.actions;
export default userSlice.reducer;
