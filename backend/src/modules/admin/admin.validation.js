import { z } from "zod";

const approvalEnum = z.enum(["APPROVED", "REJECTED"]);

export const updateShopApprovalSchema = z.object({
  params: z.object({
    shopUserId: z.string().min(1, "Shop user id is required")
  }),
  body: z.object({
    status: approvalEnum
  })
});

export const createAdminUserSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, "Full name is required"),
    mobile: z.string().min(10, "Mobile number is required"),
    email: z.string().email("Valid email is required"),
    password: z.string().min(8, "Password must be at least 8 characters")
  })
});
