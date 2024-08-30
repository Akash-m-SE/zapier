import { z } from "zod";

export const ZapCreateSchema = z.object({
  availableTriggerId: z.string(),
  triggerMetadata: z.any().optional(),
  actions: z.array(
    z.object({
      availableActionId: z.string(),
      actionMetadata: z.any().optional(),
    }),
  ),
});

export const triggerSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
});

export type AvailableTrigger = z.infer<typeof triggerSchema>;

export const actionSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
});

export type AvailableAction = z.infer<typeof actionSchema>;
