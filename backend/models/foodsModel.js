import mongoose from "mongoose";

const foodsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: {
      type: String,
      required: false,
      default: "",
    },
    restaurant: { type: String, required: true },
    price: { type: Number, required: true },
    restaurant: { type: String, required: true },
    restID: { type: String, required: true },
    comments: { type: Number, required: false, default: 0 },
    favorite: { type: Number, required: false, default: false },
    stock: { type: Number, required: false },
    rating: { type: String, required: false, default: 1 },
  },
  { timestamps: true }
);
const Foods = mongoose.model("Foods", foodsSchema);
export default Foods;
