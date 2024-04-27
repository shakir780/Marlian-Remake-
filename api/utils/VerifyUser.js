import jwt from "jsonwebtoken";
import { errorhandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req?.cookies?.access_token;

  // Check if token is missing
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Handle invalid token
      return res.status(403).json({ message: "Forbidden" });
    }
    // Token is valid, attach user to request object
    req.user = user;
    next();
  });
};
