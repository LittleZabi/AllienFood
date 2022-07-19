import { configureStore } from "@reduxjs/toolkit";
import FoodsReducer from "./foodsSlice";
import CartReducer from "./cartSlice";
const store = configureStore({
  reducer: {
    foods: FoodsReducer,
    cart: CartReducer,
  },
});

export default store;
