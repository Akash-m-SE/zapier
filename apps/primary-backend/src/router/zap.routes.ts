import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

import {
  createNewZap,
  deleteSingleZap,
  getSingleZap,
  listAllZaps,
} from "../controllers/zap.controller";

const router = Router();

router.post("/", authMiddleware, createNewZap); // Create a fresh zap
router.get("/", authMiddleware, listAllZaps); // List all the zaps
router.get("/:zapId", authMiddleware, getSingleZap); // Get Individual Zap

// Delete a Singular Zap
router.delete("/:zapId", authMiddleware, deleteSingleZap);

export const zapRouter = router;
