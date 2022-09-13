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
export const payOrder = createAsyncThunk("paid/order", async (order) => {
  try {
    const r = await axios.put(
      `/app/order/${order.order._id}/pay`,
      order.payment_resposne,
      {
        headers: { Authorization: `Bearer ${order.token}` },
      }
    );
    console.log(r.data);
    return { message: null, payment: r.data, error: null };
  } catch (error) {
    console.log(error.message);
    return {
      message: error.response.data && error.response.data.message,
      payment: null,
      error: error.message,
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

export const mineOrders = createAsyncThunk(
  "get/history",
  async (user_token) => {
    try {
      const r = await axios.get("/app/order/history", {
        headers: { Authorization: `Bearer ${user_token}` },
      });
      return { message: null, orders: r.data, error: null };
    } catch (error) {
      return {
        message: error.response.data && error.response.data.message,
        order: null,
        error: error.message,
      };
    }
  }
);

const initialState = {
  order: [],
  status: "order_idle",
  error: null,
  paid_detail: undefined,
  history: [],
};
const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder(state, action) {
      state.order = [];
      state.status = "order_idle";
      state.error = null;
      state.paid_detail = [];
      state.history = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.status = "order_pending";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "order_complete";
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "order_error";
        state.error = action.payload;
      })
      .addCase(getOrder.pending, (state, action) => {
        state.status = "order_pending";
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.status = "order_complete";
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.status = "order_error";
        state.error = action.payload;
      })
      .addCase(payOrder.pending, (state, action) => {
        state.status = "paid_pending";
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.status = "paid_complete";
        state.paid_detail = action.payload;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.status = "paid_error";
        state.error = action.payload;
      })
      .addCase(mineOrders.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(mineOrders.fulfilled, (state, action) => {
        state.status = "complete";
        state.history = action.payload;
      })
      .addCase(mineOrders.rejected, (state, action) => {
        state.status = "error";
        state.history = action.payload;
      });
  },
});

export const getOrderItem = (state) => state.order.order;
export const getOrderStatus = (state) => state.order.status;
export const getOrderError = (state) => state.order.error;
export const getPaidDetails = (state) => state.order.paid_detail;
export const getHistory = (state) => state.order.history;
export const { clearOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
