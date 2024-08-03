import express from "express";
import cors from "cors";
import { userRouter } from "./router/user.routes";
import { zapRouter } from "./router/zap.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);

app.use("/api/v1/zap", zapRouter);

app.listen(3000, () => {
  console.log("Server is listening on Port 3000");
});
