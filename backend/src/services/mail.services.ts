import { ErrorMap } from "../constants/errors";
import { UserId, SessionId, MailId } from "../constants/types";
import { getData, getSessions } from "../dataStore";

export function viewAllMail(userId: UserId, sessionId: SessionId) {
  const sessions = getSessions();
  const store = getData();
  const session = sessions.find((session) => session.sessionId === sessionId);

  if (!session || session === undefined) {
    throw new Error(ErrorMap["INVALID_SESSION"]);
  }
  const user = store.users.find((user) => user.userId === userId);
  if (!user || user === undefined) {
    throw new Error(ErrorMap["USER_DOES_NOT_EXIST"]);
  }
  const emails = store.mails.filter((mail) =>
    mail.receivers.includes(user.email)
  );
  return emails;
}

export function getEmail(userId: UserId, sessionId: SessionId, mailId: MailId) {
  const sessions = getSessions();
  const store = getData();

  const session = sessions.find((session) => session.sessionId === sessionId);

  if (!session || session === undefined) {
    throw new Error(ErrorMap["INVALID_SESSION"]);
  }
  const user = store.users.find((user) => user.userId === userId);
  if (!user || user === undefined) {
    throw new Error(ErrorMap["USER_DOES_NOT_EXIST"]);
  }

  const email = store.mails.find((mail) => mail.mailId === mailId);

  // email does not exist
  if (!email || email === undefined) {
    throw new Error(ErrorMap["EMAIL_DOES_NOT_EXIST"]);
  }

  // email does not exist in user's inbox
  if (!email.receivers.some((reciever) => reciever === user.email)) {
    throw new Error(ErrorMap["EMAIL_DOES_NOT_EXIST"]);
  }

  return email;
}
