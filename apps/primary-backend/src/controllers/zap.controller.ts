import { Request, Response } from "express";
import prisma from "../lib/prisma";

import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ZapCreateSchema } from "@repo/zod-schemas";
import { ApiResponse } from "../utils/ApiResponse";

// Create New Zap
const createNewZap = asyncHandler(async (req: Request, res: Response) => {
  const id = req.id;
  const body = req.body;
  const parsedData = ZapCreateSchema.safeParse(body);

  if (!parsedData.success) {
    throw new ApiError(411, "Incorrect Inputs");
  }

  const zapId = await prisma.$transaction(async (tx) => {
    const zap = await prisma.zap.create({
      data: {
        userId: id,
        triggerId: "",
        actions: {
          create: parsedData.data.actions.map((action, index) => ({
            actionId: action.availableActionId,
            sortingOrder: index,
            metadata: action.actionMetadata,
          })),
        },
      },
    });

    const trigger = await tx.trigger.create({
      data: {
        triggerId: parsedData.data.availableTriggerId,
        zapId: zap.id,
      },
    });

    await tx.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });

    return zap.id;
  });

  if (!zapId) {
    throw new ApiError(500, "Zap creation failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Zap created successfully!"));
});

// List All the Zaps
const listAllZaps = asyncHandler(async (req: Request, res: Response) => {
  const id = req.id;
  const zaps = await prisma.zap.findMany({
    where: {
      userId: id,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });

  if (!zaps) {
    throw new ApiError(404, "No Zaps found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, zaps, "Zaps found successfully"));
});

const getSingleZap = asyncHandler(async (req: Request, res: Response) => {
  const id = req.id;
  const zapId = req.params.zapId;

  if (!zapId) {
    throw new ApiError(404, "All fields are necessary");
  }

  const zap = await prisma.zap.findFirst({
    where: {
      id: zapId,
      userId: id,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });

  if (!zap) {
    throw new ApiError(404, "No Zaps found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, zap, "Zap found successfully"));
});

// Delete a Singular Zap
const deleteSingleZap = asyncHandler(async (req: Request, res: Response) => {
  const zapId = req.params.zapId;
  if (!zapId) {
    throw new ApiError(404, "No Zaps found");
  }

  const zap = await prisma.$transaction(async (tx) => {
    await tx.trigger.delete({
      where: {
        zapId: zapId,
      },
    });

    await tx.action.deleteMany({
      where: {
        zapId: zapId,
      },
    });

    const zapRuns = await tx.zapRun.findMany({
      where: {
        zapId: zapId,
      },
    });
    const zapRunIds = zapRuns.map((zapRun) => zapRun.id);

    await tx.zapRun.deleteMany({
      where: {
        zapId: zapId,
      },
    });

    await tx.zapRunOutbox.deleteMany({
      where: {
        zapRunId: {
          in: zapRunIds,
        },
      },
    });

    await tx.zap.delete({
      where: {
        id: zapId,
      },
    });
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Zap deleted successfully"));
});

export { createNewZap, listAllZaps, getSingleZap, deleteSingleZap };
