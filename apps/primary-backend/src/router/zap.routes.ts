import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

import {
  createNewZap,
  getSingleZap,
  listAllZaps,
} from "../controllers/zap.controller";

const router = Router();

// Create a fresh zap
router.post("/", authMiddleware, createNewZap);

// List all the zaps
router.get("/", authMiddleware, listAllZaps);

// Get Individual Zap
router.get("/:zapId", authMiddleware, getSingleZap);

export const zapRouter = router;
