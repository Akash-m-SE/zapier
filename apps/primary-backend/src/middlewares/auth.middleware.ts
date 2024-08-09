import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string;

    const payload = jwt.verify(token, process.env.JWT_PASSWORD as string);

    if (!payload) {
      throw new ApiError(401, "Unauthorized Request!");
    }

    //@ts-ignore
    req.id = payload.id;
    next();
  },
);

export { authMiddleware };
