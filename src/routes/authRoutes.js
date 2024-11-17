import express from "express";
import { register, login, getUser } from "../controllers/authController.js";
// import {
//   registerValidator,
//   loginValidator,
// } from "../validators/authValidator.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/user", authenticateToken, getUser);

export default router;
