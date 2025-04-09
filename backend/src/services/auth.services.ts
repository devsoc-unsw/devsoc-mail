import { ErrorMap } from "../constants/errors";
import {
  Name,
  Email,
  Password,
  Session,
  UserId,
  User,
  SessionId,
} from "../constants/types";
import {
  generateSessionId,
  getData,
  getSessions,
  setData,
  setSessions,
} from "../dataStore";

/**
 * You can use the following helper functions in your code:
 *
 * - generateUserId(): UserId
 *   ➤ Generates a random 6-digit user ID.
 *
 * - isValidName(name: Name): string | boolean
 *   ➤ Checks if the provided name is within 1 to 100 characters.
 *   ➤ Returns true if valid, or an error string if not.
 *
 * - isValidEmail(email: Email, isRegister?: boolean): string | boolean
 *   ➤ Checks if the provided email is within 1 to
 *      50 characters and ends with `@devsoc.mail`.
 *   ➤ Checks if the email already exists during registration.
 *   ➤ Returns true if valid, or an error string if not.
 *
 * - isValidPassword(password: Password): string | boolean
 *   ➤ Checks if the password is at least 6 characters long and contains at
 *      least one lowercase letter, one uppercase letter, and one number.
 *   ➤ Returns true if valid, or an error string if not.
 */

/** DEMO
 * Registers a new user by validating their name, email, and password, and
 * then creating a new session and user record.
 *
 * @param name - The name of the user to register.
 * @param email - The email of the user to register.
 * @param password - The password of the user to register.
 * @returns The newly created session object with sessionId and userId.
 *
 * @throws {Error} If the name is invalid (too long or too short).
 * @throws {Error} If the email is invalid (too long, too short, or already
 * exists).
 * @throws {Error} If the password is invalid (does not contain at least one
 * uppercase letter, one lowercase letter, and one number).
 */
export function authRegister(
  name: Name,
  email: Email,
  password: Password
): Session {
  // return session;
}

/**
 * Logs in an existing user and returns a session
 * Workshop 5 Exercise 1
 *
 * Errors to handle:
 * 400 Email does not have the suffix @devsoc.mail
 * 400 Email does not exist
 * 400 Password is incorrect
 *
 * Otherwise, return a session + store the session into sessionStore
 *
 * HINT: see function authRegister
 *
 * @param email - The email of the user attempting to log in.
 * @param password - The password of the user attempting to log in.
 * @returns An object containing the sessionId for the logged-in user.
 */
export function authLogin(email: Email, password: Password) {
  // return { sessionId: sessionId };
}

/** DEMO
 * Logs out a user by removing their session from the active session list.
 * 
 * @param sessionId - The session ID of the user to log out.
 * @returns An empty object after successfully logging the user out.
 */
export function authLogout(sessionId: SessionId) {
  // return {};
}

////////////////////////////// HELPER FUNCTIONS  ////////////////////////////////
function generateUserId(): UserId {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

function isValidName(name: Name): string | boolean {
  if (name.length > 100) {
    return ErrorMap["NAME_TOO_LONG"];
  }

  if (name.length < 1) {
    return ErrorMap["NAME_TOO_SHORT"];
  }

  return true;
}

function isValidEmail(email: Email, isRegister?: boolean): string | boolean {
  if (email.length > 50) {
    return ErrorMap["EMAIL_TOO_LONG"];
  }

  if (email.length < 1) {
    return ErrorMap["EMAIL_TOO_SHORT"];
  }

  const users = getData().users;
  if (users.find((u) => u.email === email) && isRegister) {
    return ErrorMap["EMAIL_ALREADY_EXISTS"];
  }

  const pattern = /[a-zA-Z0-9_\-]*@devsoc.mail/;
  if (!pattern.test(email)) {
    return ErrorMap["EMAIL_SUFFIX"];
  }

  return true;
}

function isValidPassword(password: Password): string | boolean {
  if (password.length < 6) {
    return ErrorMap["PASSWORD_LENGTH"];
  }

  const numPattern = /\d/;
  const upperPattern = /[A-Z]/;
  const lowerPattern = /[a-z]/;
  if (
    !numPattern.test(password) ||
    !upperPattern.test(password) ||
    !lowerPattern.test(password)
  ) {
    return ErrorMap["PASSWORD_SYMBOLS"];
  }

  return true;
}
