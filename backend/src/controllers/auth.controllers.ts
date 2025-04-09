import { Request, Response } from "express";
import * as authService from "../services/auth.services";

/**
 * Handle HTTP requests in a structured manner with different methods.
 * - GET Requests:
 *   - Parameters (query string) are passed via `req.query` and are always 
 *     strings.
 *   - Use `req.query` to extract data from the URL parameters.
 * 
 * - POST Requests:
 *   - Body data is passed via `req.body` (in formats like JSON, form data, 
 *     etc.).
 *   - Use `req.body` to extract data sent in the request body.
 * 
 * - PUT Requests:
 *   - Body data is passed via `req.body`, similar to POST requests.
 *   - Use `req.body` to extract the data that should update the resource.
 *   - Often used to update existing resources on the server.
 * 
 * - DELETE Requests:
 *   - Often use URL parameters (similar to GET) or request body for 
 *     identifiers.
 *   - Use `req.params` or `req.body` (depending on the API design) to identify 
 *     the resource to delete.
 * 
 * - All Requests:
 *   - All requests have headers that can be accessed via `req.headers`.
 *   - Use `req.headers` to retrieve information like authentication tokens or 
 *     session IDs.
 *
 */

// DEMO
// POST route handler to register a new user with the provided name, email,
// and password.
// Body parameters:
//   - name: The user's name.
//   - email: The user's email address.
//   - password: The user's chosen password.
async function register(req: Request, res: Response) {
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
  
}

// POST route handler to log out a user based on the provided session token.
// Headers:
//   - session: A session token for the user to be logged out.
async function logout(req: Request, res: Response) {
  try {
    const session = req.header('session');
    const auth = authService.authLogout(session as string);
    res.json(auth);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export { register, login, logout };
