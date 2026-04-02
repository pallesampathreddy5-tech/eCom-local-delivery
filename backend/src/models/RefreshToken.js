import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    tokenHash: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    },
    revokedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

refreshTokenSchema.index({ userId: 1, expiresAt: 1 });

export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
