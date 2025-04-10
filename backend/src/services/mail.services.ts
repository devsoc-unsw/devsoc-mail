import { ErrorMap } from "../constants/errors";
import {
  SessionId,
  MailId,
  Receivers,
  Title,
  Message,
  Mail,
  Email,
} from "../constants/types";
import { getData, getSessions, setData } from "../dataStore";

/**
 * You can use the following helper functions in your code:
 * 
 * - generateMailId(): MailId  
 *   ➤ Generates a random unique mail ID.
 * 
 * - isValidReceiver(receivers: Receivers): string | boolean  
 *   ➤ Checks if all provided email addresses are valid users.  
 *   ➤ Returns true if all are valid, or an error string if not.
 * 
 * - isValidTitle(title: Title): string | boolean  
 *   ➤ Checks if the mail title is within the 50 character limit.  
 *   ➤ Returns true if valid, or an error string otherwise.
 * 
 * - getSender(sessionId: SessionId): string | undefined  
 *   ➤ Finds the email address of the user associated with a session ID.
 * 
 * - isValidMailId(mailId: MailId): string | boolean  
 *   ➤ Checks if a mail with the given ID exists.  
 *   ➤ Returns true if it exists, or an error string otherwise.
 */



/** DEMO
 * Retrieves all emails for the specified session ID (user).
 * 
 * @param sessionId - The session ID of the user.
 * @returns An object containing a list of mails that the user is a receiver of.
 * 
 * @throws {Error} If the session ID does not correspond to a valid user.
 */
export function viewAllMail(sessionId: SessionId) {
  // return { mails: emails };
}

/** EXAMPLE
 * Retrieves the email associated with a given session and mail ID.
 * 
 * @param session - The session ID of the user.
 * @param mailId - The mail ID to fetch the email for.
 * @returns The email object if found, throws an error if not.
 * 
 * @throws {Error} If the mail ID is invalid.
 * @throws {Error} If the email does not exist.
 * @throws {Error} If the user does not exist.
 */
export function getEmail(session: SessionId, mailId: MailId) {
  if (isValidMailId(mailId) !== true) {
    throw new Error(isValidMailId(mailId) as string);
  }

  const data = getData();
  const mails = data.mails;
  const sessions = getSessions();

  const email = mails.find(m => m.mailId == mailId) as Mail;
  if (!email || email === undefined) {
    throw new Error(ErrorMap["EMAIL_DOES_NOT_EXIST"]);
  }

  const user = sessions.find(s => s.sessionId == session)?.userId as number;
  if (!user || user === undefined) {
    throw new Error(ErrorMap["USER_DOES_NOT_EXIST"]);
  }

  return { mail: email };
}
/**
 * Sends an email to the specified receivers with the given title and message.
 * 
 * @param receivers - An array of email addresses to send the email to.
 * @param title - The title of the email.
 * @param message - The content of the email message.
 * @param session - The session ID of the sender.
 * @returns An object containing the generated mail ID.
 * 
 * @throws {Error} If one or more receivers do not exist.
 * @throws {Error} If the title exceeds 50 characters.
 */
export function sendMail(
  receivers: Receivers,
  title: Title,
  message: Message,
  session: SessionId
) {
  
  // return { mailId: mailId };
}

/**
 * Deletes the specified emails for the given user by removing their email 
 * address from the receivers list. If no receivers remain, the mail is deleted.
 * 
 * @param mailIds - An array of mail IDs to be deleted.
 * @param userEmail - The email address of the user who is deleting the mail.
 * @returns An empty object once the deletion process is complete.
 * 
 * @throws {Error} If any of the provided mail IDs are invalid.
 */
export function deleteMail(mailIds: MailId[], userEmail: Email) {
  // return {};
}


/** DEMO
 * Marks an email as read by the user associated with the given session ID.
 * Updates database.
 * 
 * @param mailId - The ID of the mail to be marked as read.
 * @param session - The session ID of the user reading the mail.
 * @returns An empty object once the mail is marked as read.
 * 
 * @throws {Error} If the provided mail ID is invalid.
 * @throws {Error} If the session ID does not correspond to a valid user.
 */
export function readMail(mailId: MailId, session: SessionId) {
  // return {};
}

////////////////////////////// HELPER FUNCTIONS  ////////////////////////////////
function generateMailId(): MailId {
  return (
    Math.floor(Date.now() * Math.random() * (999999 - 100000 + 1)) + 100000
  );
}

function isValidReceiver(receivers: Receivers): string | boolean {
  const users = getData().users;
  for (const receiver of receivers) {
    if (!users.find((u) => u.email === receiver)) {
      return ErrorMap["RECEIVER_MISSING"];
    }
  }
  return true;
}

function isValidTitle(title: Title): string | boolean {
  if (title.length > 50) {
    return ErrorMap["MAIL_TITLE_LENGTH"];
  }
  return true;
}

function isValidMailId(mailId: MailId): string | boolean {
  const mails = getData().mails;
  if (!mails.find((m) => m.mailId === mailId)) {
    return ErrorMap["MAIL_MISSING"];
  }
  return true;
}

function getSender(sessionId: SessionId) {
  const sessions = getSessions();
  const session = sessions.find((s) => s.sessionId === sessionId);
  const userId = session?.userId;
  const users = getData().users;
  const addr = users.find((u) => u.userId === userId)?.email;
  return addr;
}
