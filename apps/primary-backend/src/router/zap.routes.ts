import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

import {
  createNewZap,
  getSingleZap,
  listAllZaps,
} from "../controllers/zap.controller";

const router = Router();

router.post("/", authMiddleware, createNewZap); // Create a fresh zap
router.get("/", authMiddleware, listAllZaps); // List all the zaps
router.get("/:zapId", authMiddleware, getSingleZap); // Get Individual Zap

export const zapRouter = router;
