import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    food: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
