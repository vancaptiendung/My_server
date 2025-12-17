import express from "express";
import authRoute from "./routes/auth.route.js";

export const app = express();

app.use(express.json());
app.use("/", authRoute);