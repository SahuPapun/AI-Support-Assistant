import express from "express";
import rateLimit from "express-rate-limit";
import {
  getUsers,
  login,
  signup,
  updateUser,
  logout,
} from "../controllers/user.js";

import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

// Limit auth endpoints to 20 requests per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/update-user", authenticate, updateUser);
router.get("/users", authenticate, getUsers);

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/logout", authLimiter, logout);

export default router;
