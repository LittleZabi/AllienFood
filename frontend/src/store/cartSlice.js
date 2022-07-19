import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: [
    // {
    //   id: 1,
    //   name: "fake item",
    //   quantity: 3,
    //   price: 20,
    //   maxQuantity: 10,
    //   image: "raimond-klavins-s75g5.jpg",
    // },
  ],
  error: null,
  status: "idle",
};

export const setCartItem = createAsyncThunk("set/cart", async (item) => {
  try {
    const res = await axios.post("/app/set-cart/", item);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return error.message;
  }
});

export const getCartItem = createAsyncThunk("get/cart", async () => {
  try {
    const res = await axios.get("/app/get-cart/");
    return [...res.data];
  } catch (error) {
    return error.message;
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItemFromCart(state, action) {
      const id = action.payload;
      const items = state.cart.filter((e) => e.id !== id);
      state.cart = items;
    },
    resetStatus(state, action) {
      state.status = "idle";
      state.error = null;
    },
    updateQtyOnSpecific(state, action) {
      const { qty, index, max } = action.payload;
      const crntQty = state.cart[index].quantity;
      if (crntQty >= max && qty === 1) return;
      if (crntQty === 1 && qty === -1) return;
      state.cart[index].quantity = state.cart[index].quantity + qty;
    },

    addItemToCart(state, action) {
      console.log(action.payload);
      let item = state.cart.filter((e) => e.id !== action.payload.id);
      state.cart = [...item, action.payload];
      state.status = "Added";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setCartItem.fulfilled, (state, action) => {
        state.status = "complete";
        state.cart = action.payload;
        console.log("cart: ", state.cart);
      })
      .addCase(setCartItem.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(getCartItem.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getCartItem.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(getCartItem.fulfilled, (state, action) => {
        state.state = "complete";
        state.cart = action.payload;
      });
  },
});
export const cartItemsAll = (state) => state.cart.cart;
export const cartItemStatus = (state) => state.cart.status;
export const {
  addItemToCart,
  resetStatus,
  updateQtyOnSpecific,
  removeItemFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
