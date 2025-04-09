import { Request, Response } from "express";
import * as mailService from "../services/mail.services";

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
async function viewAllMail(req: Request, res: Response) {
  
}

// EXAMPLE
async function singleMailView(req: Request, res: Response) {
    try {
        const session = req.header('session');
        const mailId = parseInt(req.params.mailid as string, 10);
        const email = mailService.getEmail(session as string, mailId);
        res.json(email);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

// This is a POST route handler function for sending an email.
// Body parameters:
//   - receivers: List of email recipients.
//   - title: The subject/title of the email.
//   - message: The body content of the email.
// Headers:
//   - session: A string session token used for authorization or tracking.
async function sendMail(req: Request, res: Response) {
    
}

// DELETE route handler to delete emails based on provided mail IDs and user email.
// Query parameters:
//   - mailIds: An array of email IDs to be deleted.
//   - email: The email address of the user requesting the deletion.
async function deleteMail(req: Request, res: Response) {
}

// POST route handler to mark a specific email as read based on the provided mail ID.
// Body parameters:
//   - mailId: The ID of the email to be marked as read.
// Headers:
//   - session: A session token for user authorization or tracking.
async function markMailAsRead(req: Request, res: Response) {
}

export { viewAllMail, singleMailView, sendMail, deleteMail, markMailAsRead };