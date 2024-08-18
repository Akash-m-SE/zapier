import { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES } from "@repo/http-status";
import prisma from "../lib/prisma";
import { tokenType, tokenVerifier } from "../services/tokenVerifierService";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken || accessToken?.startsWith("Bearer")) {
      throw new ApiError(
        HTTP_STATUS_CODES.ACCESS_TOKEN_NOT_FOUND,
        HTTP_STATUS_MESSAGES.ACCESS_TOKEN_NOT_FOUND,
      );
    }

    const decodedToken = tokenVerifier(accessToken, tokenType.AccessToken);

    if (!decodedToken) {
      throw new ApiError(401, "Invalid Access Token!");
    }

    const user = await prisma.user.findFirst({
      where: {
        id: decodedToken.id,
      },
    });

    if (!user) {
      throw new ApiError(401, "Invalid Access Token!");
    }

    // Attaching a new id field to the request object
    req.id = decodedToken.id;

    next();
  },
);
