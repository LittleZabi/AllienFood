import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk("create/order", async (order) => {
  // try {

  await axios
    .post("/app/order", order, {
      headers: {
        Authorization: `Bearer ${order.user.token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.error(e.message);
      return { message: e.message };
    });
  // return { message: "Order created successfully", data };
  // } catch (error) {
  //   return { message: error.message };
  // }
});
const initialState = {
  order: [],
  status: "idle",
  error: null,
};
const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "complete";
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});
export const getOrderItem = (state) => state.order.order;
export const getOrderStatus = (state) => state.order.status;
export const getOrderError = (state) => state.order.error;

export default OrderSlice.reducer;
