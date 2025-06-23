import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "processing",
    },
    paymemt: {
      type: String,
      default: "paid",
    },
    sneakers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sneaker",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
