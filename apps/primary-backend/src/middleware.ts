import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization as unknown as string;

  try {
    const payload = jwt.verify(token, process.env.JWT_PASSWORD as string);
    //@ts-ignore
    req.id = payload.id;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "You are not logged in",
    });
  }
}
