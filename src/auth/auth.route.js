import express from "express";
import { showkey, login, profile } from "./auth.controller.js";
import {authmiddleware} from "./auth.middleware.js"

const router = express.Router();

router.get("/home", showkey);

router.post("/login",login);
router.get("/profile", authmiddleware, profile);

export default router;