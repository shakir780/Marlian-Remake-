import express from "express";
import {
  addToCart,
  getCart,
  deleteCartItems,
  increaseCartQuantity,
  decreaseCartQuantity,
} from "../controllers/cart.controller.js";
import { verifyToken } from "../utils/VerifyUser.js";
const router = express.Router();

router.post("/add", verifyToken, addToCart);
router.post("/increase/:id", verifyToken, increaseCartQuantity);
router.post("/decrease/:id", verifyToken, decreaseCartQuantity);
router.delete("/delete/:id", verifyToken, deleteCartItems);
router.get("/get", verifyToken, getCart);

export default router;
