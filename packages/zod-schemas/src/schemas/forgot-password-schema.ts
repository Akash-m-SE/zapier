import { z } from "zod";

// Forgot Password Schema
export const emailFormSchema = z.object({
  email: z.string().min(5),
});

export const otpFormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export const passwordFormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(16, "Password cannot exceed 16 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This will target the confirmPassword field
  });
