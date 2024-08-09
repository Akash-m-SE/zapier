import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

const fetchAvailableActions = asyncHandler(
  async (req: Request, res: Response) => {
    const availableActions = await prisma.availableAction.findMany({});

    if (!availableActions) {
      throw new ApiError(404, "No Available Actions found");
    }

    res.json({
      availableActions,
    });
  },
);

export { fetchAvailableActions };
