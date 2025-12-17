import express from "express";
import { showkey, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/home", showkey);

router.post("/login",login);

export default router;