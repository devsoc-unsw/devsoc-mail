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
 * Registers and logs in a new email and returns a session
 */
export async function authRegister(
  name: Name,
  email: Email,
  password: Password
): Promise<Session> {
  // Validate name
  if (isValidName(name) !== true) {
    throw new Error(isValidName(name) as string);
  }

  // Validate email
  if ((await isValidEmail(email, true)) !== true) {
    throw new Error((await isValidEmail(email, true)) as string);
  }

  // Validate password
  if (isValidPassword(password) !== true) {
    throw new Error(isValidPassword(password) as string);
  }
  // Create session
  const session: Session = {
    sessionId: uuidv4(),
    userId: uuidv4(),
  };

  // Create user
  const user: User = {
    name: name,
    email: email,
    password: password,
    inbox: {},
    userId: uuidv4(),
  };

  // Add session to MongoDB
  await sessionsCollection.updateOne(
    {},
    { $push: { sessions: session } as any },
    { upsert: true }
  );

  // Add user to MongoDB
  await usersCollection.updateOne(
    {},
    { $push: { users: user } as any },
    { upsert: true }
  );

  return session;
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
    throw new Error(
      `${ErrorMap["EMAIL_DOES_NOT_EXIST"]} or ${ErrorMap["PASSWORD_INCORRECT"]}`
    );
  }

  // Add session to MongoDB
  const sessionDoc = await sessionsCollection.insertOne({
    userId: user._id.toString(),
  });

  console.log(sessionDoc.insertedId.toString());

  return sessionDoc.insertedId.toString();
}

export async function authLogout(sessionId: SessionId) {
  console.log("sessionId: ", sessionId);
  // Remove session from MongoDB
  await sessionsCollection.deleteOne({
    sessionId: sessionId,
  });

  return {};
}
