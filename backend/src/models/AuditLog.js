import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    actorUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    actorRole: { type: String, required: true },
    action: { type: String, required: true },
    targetType: { type: String, required: true },
    targetId: { type: String, required: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    ip: { type: String, default: "" },
    userAgent: { type: String, default: "" }
  },
  { timestamps: true }
);

auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ actorUserId: 1, createdAt: -1 });

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
