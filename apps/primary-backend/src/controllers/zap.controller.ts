import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { ZapCreateSchema } from "../../types/zodSchemas";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

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

  return res.json({
    zapId,
  });
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

  return res.json({
    zaps,
  });
});

const getSingleZap = asyncHandler(async (req: Request, res: Response) => {
  const id = req.id;
  const zapId = req.params.zapId;

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

  return res.json({
    zap,
  });
});

export { createNewZap, listAllZaps, getSingleZap };
