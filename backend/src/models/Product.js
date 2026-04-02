import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    categoryId: { type: String, required: true, trim: true },
    shopUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shopName: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    image: { type: String, default: "https://images.unsplash.com/photo-1542838132-92c53300491e" },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    isActive: { type: Boolean, default: true },
    createdByRole: { type: String, enum: ["SHOPKEEPER", "ADMIN", "SUPER_ADMIN"], required: true }
  },
  { timestamps: true }
);

productSchema.index({ shopUserId: 1, categoryId: 1, isActive: 1 });

export const Product = mongoose.model("Product", productSchema);
