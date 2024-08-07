import { Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapCreateSchema } from "../types";
import prisma from "../lib/prisma";

const router = Router();

// Create a fresh zap
router.post("/", authMiddleware, async (req, res) => {
  //@ts-ignore
  const id = req.id;
  const body = req.body;
  const parsedData = ZapCreateSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
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

  return res.json({
    zapId,
  });
});

// List all the zaps
router.get("/", authMiddleware, async (req, res) => {
  // @ts-ignore
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

  return res.json({
    zaps,
  });
});

// Ind Zap
router.get("/:zapId", authMiddleware, async (req, res) => {
  //@ts-ignore
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

  return res.json({
    zap,
  });
});
export const zapRouter = router;
