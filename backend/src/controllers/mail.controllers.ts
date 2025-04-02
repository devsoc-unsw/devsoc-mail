import { Request, Response } from "express";
import * as mailService from "../services/mail.services";
import { StatusCodeMap } from "../constants/errors";
import { MailId } from "../constants/types";

async function viewAllMail(req: Request, res: Response) {
    try {
        // req.query is always passed as strings
        // Convert to integer
        const userId = parseInt(req.query.userId as string, 10);

        const sessionId = req.query.sessionId as string;
    
        const mail = mailService.viewAllMail(userId, sessionId);
        res.json(mail);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

async function singleMailView(req: Request, res: Response) {
    try {
        // const { userId, sessionId, mailId } = req.params;
        const userId = parseInt(req.params.userId as string, 10);
        const sessionId = req.params.sessionId as string;
        const mailId = parseInt(req.params.mailId as string, 10);
        const email = mailService.getEmail(userId, sessionId, mailId);
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
    const result = mailService.deleteMail(mailIds);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

async function markMailAsRead(req: Request, res: Response) {
    try {
    } catch (err) {
    }
}

export { viewAllMail, singleMailView, sendMail, deleteMail, markMailAsRead };