import { NextFunction, Request, Response } from "express";

interface AsyncRequestHandlerType {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

export const asyncHandler =
  (fn: AsyncRequestHandlerType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      console.log("Error Occured = ", error);
      res.status(error.statusCode || 500).json({
        error: true,
        statusCode: error.statusCode,
        success: false,
        message: error.message,
      });
    }
  };
