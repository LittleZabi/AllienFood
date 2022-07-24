import { configureStore } from "@reduxjs/toolkit";
import FoodsReducer from "./foodsSlice";
import CartReducer from "./cartSlice";
import UserSlice from "./userSlice";
const store = configureStore({
  reducer: {
    foods: FoodsReducer,
    cart: CartReducer,
    user: UserSlice,
  },
});

export default store;
