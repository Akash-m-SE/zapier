import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

import "dotenv/config";
import {
  getCurrentUser,
  refreshAccessToken,
  signinUser,
  signupUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.get("/", authMiddleware, getCurrentUser); //Fetch current logged in user
router.post("/refresh-token", authMiddleware, refreshAccessToken); // Refreshing the Access and Refresh Token

export const userRouter = router;
