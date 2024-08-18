import prisma from "../lib/prisma";
import { SigninSchema, SignupSchema } from "../../types/zodSchemas";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { hashPassword, isPasswordCorrect } from "../services/passwordService";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/tokenService";
import { tokenType, tokenVerifier } from "../services/tokenVerifierService";
import { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES } from "@repo/http-status";
import { otpCreate } from "../services/otpService";
import { sendEmail } from "@repo/mailer-config";

const signupUser = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const parsedData = SignupSchema.safeParse(body);

  if (!parsedData.success) {
    console.log("Error while parsing data = ", parsedData.error);
    throw new ApiError(411, "Error while parsing data");
  }

  const userExists = await prisma.user.findFirst({
    where: {
      email: parsedData.data.email,
    },
  });

  if (userExists) {
    throw new ApiError(403, "User already exists!");
  }

  const hashedPassword = await hashPassword(parsedData.data.password);

  const otp = otpCreate();

  const user = await prisma.user.create({
    data: {
      email: parsedData.data.email,
      password: hashedPassword,
      name: parsedData.data.name,
      otp: otp,
    },
  });

  if (!user) {
    throw new ApiError(500, "Account creation failed");
  }

  // TODO: sends out email to the user to verify

  const emailBody = otp.toString();
  await sendEmail(user.email, emailBody); // sends out the otp to user email after successful account creation

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Account created successfully."));
});

const signinUser = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;

  const parsedData = SigninSchema.safeParse(body);

  if (!parsedData.success) {
    throw new ApiError(411, "Incorrect Inputs.");
  }

  const user = await prisma.user.findFirst({
    where: {
      email: parsedData.data.email,
    },
  });

  if (!user) {
    throw new ApiError(403, "Incorrect Credentials!");
  }

  const isPasswordValid = await isPasswordCorrect(
    parsedData.data.password,
    user.password,
  );
  if (!isPasswordValid) {
    throw new ApiError(403, "Incorrect Credentials!");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user.id,
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { userId: user.id, accessToken: accessToken, verify: user.verify },
        "User logged in successfully",
      ),
    );
});

const signoutUser = asyncHandler(async (req: Request, res: Response) => {
  await prisma.user.update({
    where: {
      id: req.id,
    },
    data: {
      refreshToken: "",
    },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully"));
});

// Fetch the currently logged in user
const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.id;
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.json({
    user,
  });
});

// Generate both access and refresh token and save refresh token in db
const generateAccessAndRefreshToken = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Failed to create access and refresh tokens");
  }
};

// Refreshing the access token after validating the refresh token
const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(
      HTTP_STATUS_CODES.REFRESH_TOKEN_NOT_FOUND,
      HTTP_STATUS_MESSAGES.REFRESH_TOKEN_NOT_FOUND,
    );
  }

  const decodedToken = tokenVerifier(
    incomingRefreshToken,
    tokenType.RefreshToken,
  );

  if (!decodedToken) {
    throw new ApiError(
      HTTP_STATUS_CODES.INVALID_REFRESH_TOKEN,
      HTTP_STATUS_MESSAGES.INVALID_REFRESH_TOKEN,
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      id: decodedToken.id,
    },
  });

  if (!user) {
    throw new ApiError(
      HTTP_STATUS_CODES.INVALID_REFRESH_TOKEN,
      HTTP_STATUS_MESSAGES.INVALID_REFRESH_TOKEN,
    );
  }

  const { accessToken } = await generateAccessAndRefreshToken(user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        userId: user.id,
        accessToken: accessToken,
      },
      "New Access Token has been generated successfully",
    ),
  );
});

const generateOtp = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.id;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const otp = otpCreate();
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      otp: otp,
    },
  });

  const body = otp.toString();
  await sendEmail(user.email, body);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "OTP generated successfully"));
});

const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.id; // or const userId = req.id // from authMiddleware
  const { otp } = req.body;

  if (!userId || !otp) {
    throw new ApiError(404, "All fields are required");
  }

  if (!otp || typeof otp !== "number") {
    throw new ApiError(404, "Invalid Credentials");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (otp !== user.otp) {
    throw new ApiError(400, "Invalid OTP");
  }

  const response = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      verify: true,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Email verified successfully"));
});

export {
  signupUser,
  signinUser,
  signoutUser,
  getCurrentUser,
  refreshAccessToken,
  generateOtp,
  verifyEmail,
};
