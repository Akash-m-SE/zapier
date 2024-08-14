import prisma from "../lib/prisma";
import { SigninSchema, SignupSchema } from "../../types/zodSchemas";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { hashPassword, isPasswordCorrect } from "../services/passwordService";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/tokenService";

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

  const user = await prisma.user.create({
    data: {
      email: parsedData.data.email,
      password: hashedPassword,
      name: parsedData.data.name,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
    },
  });

  if (!user) {
    throw new ApiError(500, "User creation failed");
  }

  // TODO: sends out email to the user to verify
  // await send Email

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user,
        "User created successfully. Please verify your account by checking your email",
      ),
    );
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
        { accessToken: accessToken },
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
const generateAccessAndRefreshToken = async (userId: number) => {
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

const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Request!");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
  ) as JwtPayload;

  const user = await prisma.user.findFirst({
    where: {
      id: decodedToken.id,
    },
  });

  if (!user) {
    throw new ApiError(404, "Invalid Refresh Token");
  }

  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "Refresh Token is expired Please sign in again");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user.id,
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {},
        "Access and Refresh Tokens have been refreshed!",
      ),
    );
});

export {
  signupUser,
  signinUser,
  signoutUser,
  getCurrentUser,
  refreshAccessToken,
};
