import { configureStore } from "@reduxjs/toolkit";
import FoodsReducer from "./foodsSlice";
import CartReducer from "./cartSlice";
import UserSlice from "./userSlice";
import OrderSlice from "./orderSlice";
const store = configureStore({
  reducer: {
    foods: FoodsReducer,
    cart: CartReducer,
    user: UserSlice,
    order: OrderSlice,
  },
});

export default store;
