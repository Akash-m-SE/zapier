import { Router } from "express";
import { fetchAvailableActions } from "../controllers/action.controller";

const router = Router();

router.get("/available", fetchAvailableActions);

export const actionRouter = router;
