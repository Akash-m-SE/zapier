import { z } from "zod";

export const emailSelectorSchema = z.object({
  email: z.string().min(1),
  body: z.string().min(1),
});

export type EmailSelector = z.infer<typeof emailSelectorSchema>;

export const solanaSelectorSchema = z.object({
  to: z.string().min(1),
  amount: z.number().min(1),
});

export type SolanaSelector = z.infer<typeof solanaSelectorSchema>;
