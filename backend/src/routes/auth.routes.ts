import express, { NextFunction } from "express";
import * as authController from "../controllers/auth.controllers"
import { sessionMiddleware } from "../middleware";

const router = express.Router();

// Registers and logs in a new user and returns a session
router.post("/auth/register", authController.register);

// Logs in an existing user and returns a session
router.post("/auth/login", authController.login);

// Logs out a logged in user
router.delete("/auth/logout", sessionMiddleware, authController.logout);

export default router;