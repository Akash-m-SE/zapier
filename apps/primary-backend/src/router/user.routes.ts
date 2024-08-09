import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

import "dotenv/config";
import {
  fetchUser,
  signinUser,
  signupUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.get("/", authMiddleware, fetchUser);

export const userRouter = router;
