import { configureStore } from "@reduxjs/toolkit";
import FoodsReducer from "./foodsSlice";
const store = configureStore({
  reducer: {
    foods: FoodsReducer,
  },
});

export default store;
