export * from "./schemas/forgot-password-schema";
export * from "./schemas/signin-schema";
export * from "./schemas/signup-schema";

import {
  ZapCreateSchema,
  triggerSchema,
  actionSchema,
} from "./schemas/zapCreate-schema";

import type {
  AvailableTrigger,
  AvailableAction,
} from "./schemas/zapCreate-schema";

export { ZapCreateSchema, triggerSchema, actionSchema };
export type { AvailableTrigger, AvailableAction };

import {
  emailSelectorSchema,
  solanaSelectorSchema,
} from "./schemas/selectorSchema";
export { emailSelectorSchema, solanaSelectorSchema };

import type { EmailSelector, SolanaSelector } from "./schemas/selectorSchema";
export type { EmailSelector, SolanaSelector };
