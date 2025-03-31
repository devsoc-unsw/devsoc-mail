import { ErrorMap } from "../constants/errors";
import { Name, Email, Password, Session, UserId, User } from "../constants/types";
import { generateSessionId, getData, getSessions, setData, setSessions } from "../dataStore"

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

    return true
}

function isValidEmail(email: Email): string | boolean {
    if (email.length > 50) {
        return ErrorMap["EMAIL_TOO_LONG"];
    }

    if (email.length < 1) {
        return ErrorMap["EMAIL_TOO_SHORT"];
    }

    // if () {
    // ... already exists
    // }

    const pattern = /[a-zA-Z0-9_\-]*@devsoc.mail/;
    if (!pattern.test(email)) {
        return ErrorMap["EMAIL_SUFFIX"];
    }

    return true
}

function isValidPassword(password: Password): string | boolean {
    if (password.length < 6) {
        return ErrorMap["PASSWORD_LENGTH"];
    }

    const numPattern = /\d/;
    const upperPattern = /[A-Z]/
    const lowerPattern = /[a-z]/
    if (!numPattern.test(password) || !upperPattern.test(password) || !lowerPattern.test(password)) {
        return ErrorMap["PASSWORD_SYMBOLS"];
    }

    return true;
}

/**
 * Registers and logs in a new email and returns a session
 * @param name
 * @param email 
 * @param password 
 */
export function authRegister(name: Name, email: Email, password: Password): Session {
    // name is greater than 100 or less than 1 characters
    if (isValidName(name) !== true) {
        throw new Error(isValidName(name) as string);
    }

    // name is greater than 100 or less than 1 characters
    if (isValidEmail(email) !== true) {
        throw new Error(isValidEmail(email) as string);
    }

    // password should have 1 uppercase, 1 lowercase, and 1 number
    if (isValidPassword(password) !== true) {
        throw new Error(isValidPassword(password) as string);
    }

    const sessions: Session[] = getSessions();
    const session: Session = {
        sessionId: generateSessionId(), 
        userId: generateUserId()
    }
    sessions.push(session);
    setSessions(sessions);

    const database = getData();
    const user: User = {
        name: name,
        email: email,
        password: password,
        inbox: {}
    }
    database.users.push(user);
    setData(database);

    return session;
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
 * @param email 
 * @param password 
 */
export function authLogin(email: Email, password: Password) {
}