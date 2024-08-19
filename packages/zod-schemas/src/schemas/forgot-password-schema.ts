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

export const passwordFormSchema = z.object({
  password: z.string().min(6, {
    message: "Your password must be atleast 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Your password must be atleast 6 characters.",
  }),
});
