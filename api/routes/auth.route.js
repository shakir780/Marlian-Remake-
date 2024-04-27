import express from "express";
import {
  signUp,
  signIn,
  logout,
  checkAuthorization,
} from "../controllers/auth.controllers.js";
import { verifyToken } from "../utils/VerifyUser.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signIn", signIn);
router.get("/logout", logout);
router.get("/protected-route", verifyToken, (req, res) => {
  // This route will only be accessible if the user is authenticated
  res.json({ message: "You are authenticated", user: req.user });
});
export default router;
