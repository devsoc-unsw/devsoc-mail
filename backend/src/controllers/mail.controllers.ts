import { Request, Response } from "express";
import * as mailService from "../services/mail.services";
import { MailId } from "../constants/types";

async function viewAllMail(req: Request, res: Response) {
    try {
        // req.query is always passed as strings
        // Convert to integer
        const email = req.query.email;
        const mail = mailService.viewAllMail(email as string);
        res.json(mail);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

async function singleMailView(req: Request, res: Response) {
    try {
        const userId = parseInt(req.params.userId as string, 10);
        const mailId = parseInt(req.params.mailId as string, 10);
        const email = mailService.getEmail(userId, mailId);
        res.json(email);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

async function sendMail(req: Request, res: Response) {
    try {
        const { receivers, title, message } = req.body;
        const session = req.header('session');
        const resp = mailService.sendMail(receivers, title, message, session as string);
        res.json(resp);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

async function deleteMail(req: Request, res: Response) {
  try {
    const mailIds = (req.query.mailIds as string[]).map(id => Number(id));
    const userEmail = req.query.email as string;
    const result = mailService.deleteMail(mailIds, userEmail);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

async function markMailAsRead(req: Request, res: Response) {
  try {
    const { mailId } = req.body;
    const session = req.header('session');
    const readMail = mailService.readMail(mailId, session as string);
    res.json(readMail);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export { viewAllMail, singleMailView, sendMail, deleteMail, markMailAsRead };