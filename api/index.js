import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import stripe from "./routes/stripe.route.js";
import cartRouter from "./routes/cart.route.js";
import wishlistRouter from "./routes/wishlist.route.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const __dirname = path.resolve();
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/stripe", stripe);
app.use;

app.use(express.static(path.join(__dirname, "/client/dist")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "/client", "dist", "index.html"));
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => console.log(`Server is running on port 3000`));

app.get("/test", (req, res) => res.send("Hello World"));
