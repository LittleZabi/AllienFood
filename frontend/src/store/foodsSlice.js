import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  foods: [],
  singleFood: [],
  status: "idle",
  error: null,
};
const restore = () => {};
export const getFoods = createAsyncThunk("api/getItems", async () => {
  try {
    const response = await axios.get("/app/foods/");
    return response.data;
  } catch (error) {
    return error.message;
  }
});
export const fetchFood = createAsyncThunk("api/getItem", async (id) => {
  try {
    let response = await axios.get("/app/foods/" + id);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
const foodsSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFoods.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getFoods.fulfilled, (state, action) => {
        state.status = "complete";
        state.foods = action.payload;
      })
      .addCase(getFoods.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(fetchFood.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchFood.fulfilled, (state, action) => {
        state.status = "complete";
        state.singleFood = action.payload;
      })
      .addCase(fetchFood.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});
export const foodsAll = (state) => state.foods.foods;
export const foodsStatus = (state) => state.foods.status;
export const foodsError = (state) => state.foods.error;
export const getFood = (state) => state.foods.singleFood;
export default foodsSlice.reducer;
