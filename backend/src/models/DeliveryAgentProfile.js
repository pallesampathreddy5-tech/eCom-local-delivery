import mongoose from "mongoose";

const deliveryAgentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    aadhaarOrKycUrl: { type: String },
    photoUrl: { type: String },
    approvalStatus: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

export const DeliveryAgentProfile = mongoose.model("DeliveryAgentProfile", deliveryAgentProfileSchema);
