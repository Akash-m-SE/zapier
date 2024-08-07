import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/available", async (req, res) => {
  const availableActions = await prisma.availableAction.findMany({});

  res.json({
    availableActions,
  });
});

export const actionRouter = router;
