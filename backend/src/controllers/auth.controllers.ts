import { Request, Response } from "express";
import * as authService from "../services/auth.services";

async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const auth = authService.authRegister(name, email, password);
    res.json(auth);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

/**
 * Workshop 5 Exercise 1
 * Implement this login function
 * Body contains email and password
 * Route is already implemented for you! (check mail.routes.ts directory)
 *
 * HINT: You might want to work on auth.services.ts first
 */
async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    console.log("email: ", email);
    console.log("password: ", password);
    const auth = await authService.authLogin(email, password);
    console.log("auth: ", auth);
    res.json(auth);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

async function logout(req: Request, res: Response) {
  try {
    const session = req.header("session");
    console.log("session: ", session);
    const auth = authService.authLogout(session as string);
    res.json(auth);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export { register, login, logout };
