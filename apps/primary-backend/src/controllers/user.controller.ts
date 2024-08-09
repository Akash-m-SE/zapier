import prisma from "../lib/prisma";
import { SigninSchema, SignupSchema } from "../types";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const signupUser = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const parsedData = SignupSchema.safeParse(body);

  if (!parsedData.success) {
    console.log("Error while parsing data = ", parsedData.error);
    throw new ApiError(411, "Error while parsing data");
  }

  const userExists = await prisma.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (userExists) {
    throw new ApiError(403, "User already exists!");
  }

  // TODO: encrypt the passwords before storing them in db

  const user = await prisma.user.create({
    data: {
      email: parsedData.data.username,
      password: parsedData.data.password,
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
    throw new ApiError(411, "Incorrect Inputs");
  }

  const user = await prisma.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  // TODO: check the password separately after fetching the user details from the db
  if (!user) {
    throw new ApiError(403, "Incorrect Credentials");
  }

  // TODO: Sign the JWT
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_PASSWORD as string,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, { token: token }, "User logged in successfully"),
    );
});

const fetchUser = asyncHandler(async (req: Request, res: Response) => {
  // Fix the type
  // @ts-ignore
  const id = req.id;
  const user = await prisma.user.findUnique({
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

export { signupUser, signinUser, fetchUser };
