import express from "express";
import authRoute from "./routes/auth.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

export const app = express();

app.use(express.json());
app.use("/", authRoute);

app.use(errorMiddleware);