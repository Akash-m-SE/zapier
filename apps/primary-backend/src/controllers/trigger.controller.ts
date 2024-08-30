import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const fetchAvailableTriggers = asyncHandler(
  async (req: Request, res: Response) => {
    const availableTriggers = await prisma.availableTrigger.findMany({});

    if (!availableTriggers) {
      throw new ApiError(400, "No Available Triggers found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          availableTriggers,
          "Available Triggers fetched successfully",
        ),
      );
  },
);

export { fetchAvailableTriggers };
