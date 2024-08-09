import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./router/user.routes";
import { zapRouter } from "./router/zap.routes";
import { triggerRouter } from "./router/trigger.routes";
import { actionRouter } from "./router/action.routes";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);
app.use("/api/v1/trigger", triggerRouter);
app.use("/api/v1/action", actionRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
