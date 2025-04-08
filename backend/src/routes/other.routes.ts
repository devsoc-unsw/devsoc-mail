import express from "express";
import * as otherController from "../controllers/other.controllers"

const router = express.Router();

// Clears database
router.delete("/clear", otherController.clear);

export default router;