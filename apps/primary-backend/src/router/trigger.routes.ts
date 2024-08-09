import { Router } from "express";
import { fetchAvailableTriggers } from "../controllers/trigger.controller";

const router = Router();

router.get("/available", fetchAvailableTriggers);

export const triggerRouter = router;
