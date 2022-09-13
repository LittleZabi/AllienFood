import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, require: false },
    address: { type: String, require: false },
    phone: { type: String, require: false },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
