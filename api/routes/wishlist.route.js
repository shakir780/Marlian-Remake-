import express from "express";
import { verifyToken } from "../utils/VerifyUser.js";
import {
  addToWishlist,
  getWishList,
  deleteWishList,
} from "../controllers/wishlist.controller.js";
const router = express.Router();

router.post("/add", verifyToken, addToWishlist);
router.get("/get", verifyToken, getWishList);
router.delete("/delete/:id", verifyToken, deleteWishList);

export default router;
