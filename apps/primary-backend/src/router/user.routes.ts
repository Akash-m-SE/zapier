import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

import "dotenv/config";
import {
  generateForgotPasswordOTP,
  generateOtp,
  getCurrentUser,
  refreshAccessToken,
  resetForgotPassword,
  signinUser,
  signoutUser,
  signupUser,
  validateForgotPasswordOTP,
  verifyEmail,
} from "../controllers/user.controller";

const router = Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.get("/", authMiddleware, getCurrentUser); // Fetch current logged in user
router.post("/signout", authMiddleware, signoutUser); // Signout User
router.post("/refresh-access-token", refreshAccessToken); // Refreshing the Access and Refresh Token
router.post("/verify/:userId", authMiddleware, verifyEmail); //verify the user's mail address
router.post("/re-generate-otp", authMiddleware, generateOtp);

// Forgot Password
router.post("/forgot-password-generate-otp", generateForgotPasswordOTP);
router.post("/forgot-password-validate-otp", validateForgotPasswordOTP);
router.post("/forgot-password-reset-password", resetForgotPassword);

export const userRouter = router;
