import mongoose from "mongoose";
import { ORDER_STATUS, PAYMENT_METHOD, PAYMENT_STATUS } from "../constants/order.js";

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    lineTotal: { type: Number, required: true }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNo: { type: String, required: true, unique: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true },
    amounts: {
      subtotal: { type: Number, required: true },
      deliveryFee: { type: Number, required: true },
      total: { type: Number, required: true }
    },
    paymentMethod: { type: String, enum: Object.values(PAYMENT_METHOD), required: true },
    paymentStatus: { type: String, enum: Object.values(PAYMENT_STATUS), required: true },
    orderStatus: { type: String, enum: Object.values(ORDER_STATUS), required: true },
    shippingAddress: { type: String, required: true }
  },
  { timestamps: true }
);

orderSchema.index({ customerId: 1, createdAt: -1 });

export const Order = mongoose.model("Order", orderSchema);
