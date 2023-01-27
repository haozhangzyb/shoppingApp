import jwt from "jsonwebtoken";
import { secret } from "../config/secret";

// This middleware is to decode jwt token to user id
export default function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, secret.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid Token" });
  }
}
