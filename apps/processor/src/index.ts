import prisma from "./lib/prisma";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const producer = kafka.producer();
  await producer.connect();

  // Infinite loop for processing
  while (1) {
    // The prisma.zapRunOutbox.findMany method fetches up to 10 rows from the zapRunOutbox table in the database. The where: {} clause means it fetches all rows, and the take: 10 clause limits the number of rows to 10.
    const pendingRows = await prisma.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });
    console.log(pendingRows);

    // The messages array is created by mapping over pendingRows, converting each row into a message with a value that is a JSON string containing the zapRunId and a stage field set to 0.
    producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((r) => {
        return {
          value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 }), //
        };
      }),
    });

    // Deletes the rows from the zapRunOutbox table that were just processed and sent to Kafka. The where clause specifies that only rows with IDs in the pendingRows array should be deleted.
    await prisma.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((x) => x.id),
        },
      },
    });

    await new Promise((r) => setTimeout(r, 3000));
  }
}

main();
