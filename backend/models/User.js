import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "customer" },
    order: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    wish: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sneaker" }],
    cart: [
      {
        sneaker: { type: mongoose.Schema.Types.ObjectId, ref: "Sneaker" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
