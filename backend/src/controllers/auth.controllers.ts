import { Request, Response } from "express";
import * as authService from "../services/auth.services";

async function register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const auth = authService.authRegister(name, email, password);
      res.json(auth);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
}

async function login(req: Request, res: Response) {
  try {
  } catch (err) {
  }
}

async function logout(req: Request, res: Response) {
  try {
  } catch (err) {
  }
}


export { register, login, logout };