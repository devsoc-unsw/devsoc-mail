import { ErrorMap } from "../constants/errors";
import { Name, Email, Password, Session, UserId, SessionId } from "../constants/types";
import { v4 as uuidv4 } from "uuid";
import { getSupabaseClient } from "../db2";

function isValidName(name: Name): string | boolean {
  if (name.length > 100) return ErrorMap["NAME_TOO_LONG"];
  if (name.length < 1) return ErrorMap["NAME_TOO_SHORT"];
  return true;
}

async function isValidEmail(email: Email, isRegister?: boolean): Promise<string | boolean> {
  if (email.length > 50) return ErrorMap["EMAIL_TOO_LONG"];
  if (email.length < 1) return ErrorMap["EMAIL_TOO_SHORT"];

  const pattern = /[a-zA-Z0-9_\-]*@devsoc\.mail/;
  if (!pattern.test(email)) return ErrorMap["EMAIL_SUFFIX"];

  if (isRegister) {
    const { data } = await getSupabaseClient()
      .from("users")
      .select("user_id")
      .eq("email", email)
      .single();
    if (data) return ErrorMap["EMAIL_ALREADY_EXISTS"];
  }

  return true;
}

function isValidPassword(password: Password): string | boolean {
  if (password.length < 6) return ErrorMap["PASSWORD_LENGTH"];
  if (!/\d/.test(password) || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
    return ErrorMap["PASSWORD_SYMBOLS"];
  }
  return true;
}

export async function authRegister(name: Name, email: Email, password: Password): Promise<Session> {
  if (isValidName(name) !== true) throw new Error(isValidName(name) as string);
  if ((await isValidEmail(email, true)) !== true) throw new Error((await isValidEmail(email, true)) as string);
  if (isValidPassword(password) !== true) throw new Error(isValidPassword(password) as string);

  const userId = uuidv4();
  const sessionId = uuidv4();

  const { error: userError } = await getSupabaseClient()
    .from("users")
    .insert({ user_id: userId, name, email, password });
  if (userError) throw new Error(userError.message);

  const { error: sessionError } = await getSupabaseClient()
    .from("sessions")
    .insert({ session_id: sessionId, user_id: userId });
  if (sessionError) throw new Error(sessionError.message);

  return { sessionId, userId };
}

export async function authLogin(email: Email, password: Password) {
  const { data: user, error } = await getSupabaseClient()
    .from("users")
    .select("user_id")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error || !user) {
    throw new Error(`${ErrorMap["EMAIL_DOES_NOT_EXIST"]} or ${ErrorMap["PASSWORD_INCORRECT"]}`);
  }

  const sessionId = uuidv4();
  const { error: sessionError } = await getSupabaseClient()
    .from("sessions")
    .insert({ session_id: sessionId, user_id: user.user_id });
  if (sessionError) throw new Error(sessionError.message);

  return sessionId;
}

export async function authLogout(sessionId: SessionId) {
  const { error } = await getSupabaseClient()
    .from("sessions")
    .delete()
    .eq("session_id", sessionId);
  if (error) throw new Error(error.message);
  return {};
}