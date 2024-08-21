import { z } from "zod";

export const SigninSchema = z.object({
  email: z.string().min(8, {
    message: "Email must be at least 8 characters long",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});
