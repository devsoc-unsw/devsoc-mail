import { Request, Response } from "express";
import * as mailService from "../services/mail.services";
import { MailId, Session } from "../constants/types";

async function viewAllMail(req: Request, res: Response) {
  try {
    // req.query is always passed as strings
    const email = req.query.email;
    const userId = req.userId; // Using the extended Request type

    //console.log("userId: ", userId);
    // Pass userId as is - let the service handle ObjectId conversion if needed
    const mail = await mailService.viewAllMail(email as string, userId);
    //console.log("mail: ", mail);
    res.json(mail);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

async function singleMailView(req: Request, res: Response) {
  try {
    // Use userId from request object instead of session header
    const userId = req.userId;
    const mailId = parseInt(req.params.mailid as string, 10);
    const email = await mailService.getEmail(userId, mailId);
    res.json(email);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

async function sendMail(req: Request, res: Response) {
  try {
    const { receivers, title, message } = req.body;
    // Use userId from request object instead of session header
    const userId = req.userId;
    const resp = await mailService.sendMail(receivers, title, message, userId);
    res.json(resp);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteMail(req: Request, res: Response) {
  try {
    const mailIds = (req.query.mailIds as string[]).map((id) => Number(id));
    const userEmail = req.query.email as string;
    const result = await mailService.deleteMail(mailIds, userEmail);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

async function markMailAsRead(req: Request, res: Response) {
  try {
    const { mailId } = req.body;
    // Use userId from request object instead of session header
    const userId = req.userId;
    const readMail = await mailService.readMail(mailId, userId);
    res.json(readMail);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export { viewAllMail, singleMailView, sendMail, deleteMail, markMailAsRead };
