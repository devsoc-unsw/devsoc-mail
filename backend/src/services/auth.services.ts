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
import { v4 as uuidv4 } from "uuid";
import { sessionsCollection, usersCollection } from "../db";
import { ObjectId } from "mongodb";

function isValidName(name: Name): string | boolean {
  if (name.length > 100) {
    return ErrorMap["NAME_TOO_LONG"];
  }

  if (name.length < 1) {
    return ErrorMap["NAME_TOO_SHORT"];
  }

  return true;
}

async function isValidEmail(
  email: Email,
  isRegister?: boolean
): Promise<string | boolean> {
  if (email.length > 50) {
    return ErrorMap["EMAIL_TOO_LONG"];
  }

  if (email.length < 1) {
    return ErrorMap["EMAIL_TOO_SHORT"];
  }

  // Get users directly from MongoDB
  const usersDoc = await usersCollection.findOne({});
  const users = usersDoc?.users || [];

  if (users.find((u: User) => u.email === email) && isRegister) {
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

/**
 * Registers and logs in a new email and returns a session - TO DEMO 
 */
export async function authRegister(
  name: Name,
  email: Email,
  password: Password
): Promise<Session> {
  // Validate name

  // Validate email


  // Validate password

  // Create session


  // Create user


  // Add session to MongoDB


  // Add user to MongoDB

  //return session;
}

/**
 * Logs in an existing user and returns a session
 */
export async function authLogin(email: Email, password: Password) {
  // Get user from MongoDB
  const user = await usersCollection.findOne({
    email: email,
    password: password,
  });

  // Check if user exists
  if (!user) {
    console.log("should error here");
    throw new Error(
      `${ErrorMap["EMAIL_DOES_NOT_EXIST"]} or ${ErrorMap["PASSWORD_INCORRECT"]}`
    );
  }

  // Add session to MongoDB

  const session: Session = {
    sessionId: uuidv4(),
    userId: user.userId,
  };

  await sessionsCollection.insertOne(session);
  console.log(session.sessionId);
  return session.sessionId;
}

export async function authLogout(sessionId: SessionId) {
  console.log("sessionId: ", sessionId);
  // Remove session from MongoDB
  await sessionsCollection.deleteOne({
    sessionId: sessionId,
  });

  return {};
}
