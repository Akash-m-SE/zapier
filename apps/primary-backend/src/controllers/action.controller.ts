import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const fetchAvailableActions = asyncHandler(
  async (req: Request, res: Response) => {
    const availableActions = await prisma.availableAction.findMany({});

    if (!availableActions) {
      throw new ApiError(404, "No Available Actions found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          availableActions,
          "Available Actions fetched successfully",
        ),
      );
  },
);

export { fetchAvailableActions };
