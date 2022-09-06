import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk("create/order", async (order) => {
  try {
    const res = await axios.post("/app/order/", order, {
      headers: {
        Authorization: `Bearer ${order.user.token}`,
      },
    });
    return { error: null, order: res.data.order, message: res.data.message };
  } catch (error) {
    return {
      error: error.message,
      order: null,
      message: error.response.data && error.response.data.message,
    };
  }
});
export const getOrder = createAsyncThunk("get/order", async (order) => {
  try {
    const r = await axios.get(`/app/order/${order.slug}`, {
      headers: {
        Authorization: `Bearer ${order.user.token}`,
      },
    });
    return { message: null, order: r.data, error: null };
  } catch (error) {
    return {
      message: error.response.data && error.response.data.message,
      order: null,
      error: error.message,
    };
  }
});
const initialState = {
  order: [],
  status: "idle",
  error: null,
};
const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder(state, action) {
      state.order = [];
      state.status = "idle";
      state.error = null;
    },
  },
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
      })
      .addCase(getOrder.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.status = "complete";
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const getOrderItem = (state) => state.order.order;
export const getOrderStatus = (state) => state.order.status;
export const getOrderError = (state) => state.order.error;
export const { clearOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
