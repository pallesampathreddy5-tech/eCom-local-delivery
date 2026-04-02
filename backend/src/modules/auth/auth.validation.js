import { z } from "zod";

const commonPassword = z
  .string({ required_error: "Password is required" })
  .min(8, "Password must be at least 8 characters");

const emailOptional = z
  .string()
  .email("Invalid email")
  .optional()
  .or(z.literal(""))
  .transform((val) => (val ? val.toLowerCase() : undefined));

export const registerCustomerSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, "Full name is required"),
    mobile: z.string().min(10, "Mobile number is required"),
    email: emailOptional,
    password: commonPassword
  })
});

export const registerShopkeeperSchema = z.object({
  body: z.object({
    shopName: z.string().min(2, "Shop name is required"),
    ownerName: z.string().min(2, "Owner name is required"),
    mobile: z.string().min(10, "Mobile number is required"),
    address: z.string().min(5, "Address is required"),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    email: emailOptional,
    password: commonPassword,
    shopCategory: z.string().min(2, "Shop category is required"),
    kycDocumentUrl: z.string().url().optional()
  })
});

export const registerDeliveryAgentSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, "Full name is required"),
    mobile: z.string().min(10, "Mobile number is required"),
    email: z.string().email("Valid email is required"),
    address: z.string().min(5, "Address is required"),
    aadhaarOrKycUrl: z.string().url().optional(),
    photoUrl: z.string().url().optional(),
    password: commonPassword
  })
});

export const loginSchema = z.object({
  body: z.object({
    loginId: z.string().min(1, "Email or mobile is required"),
    password: z.string().min(1, "Password is required")
  })
});
