import express from "express";
import { signUp, signIn } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signIn", signIn);

export default router;
