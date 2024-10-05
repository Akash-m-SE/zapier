import express from "express";
import prisma from "./lib/prisma";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;

  try {
    // store in a new db trigger

    await prisma.$transaction(async (tx: any) => {
      const run = await tx.zapRun.create({
        data: {
          zapId: zapId,
          metadata: body,
        },
      });

      await tx.zapRunOutbox.create({
        data: {
          zapRunId: run.id,
        },
      });
    });

    res.json({
      message: "Webhook received",
    });
  } catch (error) {
    console.error("Error creating ZapRun and ZapRunOutbox:", error);
    res.status(500).send("An error occurred while processing the webhook.");
  }
});

app.use((req, res) => {
  res.send(`Hooks Server is up and running on Port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Hooks Server is listening on port ${PORT}`);
});
