import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: localStorage.getItem("alienfoodCart")
    ? JSON.parse(localStorage.getItem("alienfoodCart"))
    : [],
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : null,
  paymentMethod: localStorage.getItem("payment-method")
    ? localStorage.getItem("payment-method")
    : null,
  error: null,
  status: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem("payment-method", action.payload);
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const items = state.cart.filter((e) => e.id !== id);
      state.cart = items;
    },
    resetStatus(state, action) {
      state.status = "idle";
      state.error = null;
    },
    flushCart(state, action) {
      state.cart = [];
      state.shippingAddress = null;
      state.paymentMethod = null;
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("alienfoodCart");
      localStorage.removeItem("payment-method");
    },
    updateQtyOnSpecific(state, action) {
      const { qty, index, max } = action.payload;
      const crntQty = state.cart[index].quantity;
      if (crntQty >= max && qty === 1) return;
      if (crntQty === 1 && qty === -1) return;
      state.cart[index].quantity = state.cart[index].quantity + qty;
    },

    addItemToCart(state, action) {
      let item = state.cart.filter((e) => e.id !== action.payload.id);
      state.cart = [...item, action.payload];
      localStorage.setItem("alienfoodCart", JSON.stringify(state.cart));
      state.status = "Added";
    },
  },
});
export const cartItemsAll = (state) => state.cart.cart;
export const cartItemStatus = (state) => state.cart.status;
export const getShippingAddress = (state) => state.cart.shippingAddress;
export const getPaymentMethod = (state) => state.cart.paymentMethod;
export const {
  addItemToCart,
  resetStatus,
  updateQtyOnSpecific,
  removeItemFromCart,
  saveShippingAddress,
  setPaymentMethod,
  flushCart,
} = cartSlice.actions;
export default cartSlice.reducer;
