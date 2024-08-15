import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

import "dotenv/config";
import {
  getCurrentUser,
  refreshAccessToken,
  signinUser,
  signoutUser,
  signupUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.get("/", authMiddleware, getCurrentUser); // Fetch current logged in user
router.post("/signout", authMiddleware, signoutUser); // Signout User
router.post("/refresh-access-token", refreshAccessToken); // Refreshing the Access and Refresh Token

export const userRouter = router;
