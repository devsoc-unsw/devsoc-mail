import express from "express";
import * as mailController from "../controllers/mail.controllers"
import { sessionMiddleware } from "../middleware";

const router = express.Router();

// Returns a list of all the user’s existing mail
router.get("/mail/view", sessionMiddleware, mailController.viewAllMail);

// View one specific mail in a user’s inbox
router.get("/mail/:mailid", sessionMiddleware, mailController.singleMailView);

// Sends mail from a user to a list of receivers
router.post("/mail/send", sessionMiddleware, mailController.sendMail);

// Deletes a list of mail (can be just one) from the user’s inbox
router.delete("/mail/delete", sessionMiddleware, mailController.deleteMail);

// Marks mail as read if unread and unread if read.
router.put("/mail/read", sessionMiddleware, mailController.markMailAsRead);

export default router;