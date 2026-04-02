import { AuditLog } from "../models/AuditLog.js";

export const createAuditLog = async ({ req, action, targetType, targetId, metadata = {} }) => {
  if (!req?.user?.userId) return;

  await AuditLog.create({
    actorUserId: req.user.userId,
    actorRole: req.user.role,
    action,
    targetType,
    targetId: String(targetId || "unknown"),
    metadata,
    ip: req.ip || req.headers["x-forwarded-for"] || "",
    userAgent: req.headers["user-agent"] || ""
  });
};
