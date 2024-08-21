import { z } from "zod";

export const SignupSchema = z.object({
  email: z.string().min(8, {
    message: "Email must be at least 8 characters long",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  name: z.string().min(5, {
    message: "Name must be at least 5 characters long",
  }),
});
