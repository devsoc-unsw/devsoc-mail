import { Request, Response } from "express";
import * as mailService from "../services/mail.services";
import { StatusCodeMap } from "../constants/errors";
import { MailId } from "../constants/types";

async function viewAllMail(req: Request, res: Response) {
  try {
  } catch (err) {
  }
}

async function singleMailView(req: Request, res: Response) {
  try {
  } catch (err) {
  }
}

async function sendMail(req: Request, res: Response) {
  try {
    const session = req.header("session");
    const { receivers, title, message } = req.body;
    const result = mailService.sendMail(receivers, title, message, session as string);
    res.json(result);
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