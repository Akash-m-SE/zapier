import express from "express";
import cors from "cors";
import { userRouter } from "./router/user.routes";
import { zapRouter } from "./router/zap.routes";
import { triggerRouter } from "./router/trigger.routes";
import { actionRouter } from "./router/action.routes";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);
app.use("/api/v1/trigger", triggerRouter);
app.use("/api/v1/action", actionRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
