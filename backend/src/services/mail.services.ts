import { ErrorMap } from "../constants/errors";
import { UserId, SessionId, MailId, Receivers, Title, Message, Mail, Email } from "../constants/types";
import { getData, getSessions, setData } from "../dataStore";

export function viewAllMail(email: Email) {
  const store = getData();

  const user = store.users.find((user) => user.email === email);
  if (!user || user === undefined) {
    throw new Error(ErrorMap["USER_DOES_NOT_EXIST"]);
  }

  const emails = store.mails.filter((mail) =>
    mail.receivers.includes(email)
  );
  return { mails: emails };
}

function generateMailId(): MailId {
  return Math.floor(Date.now() * Math.random() * (999999 - 100000 + 1)) + 100000;
}

function isValidReceiver(receivers: Receivers): string | boolean {
  const users = getData().users;
  for (const receiver of receivers) {
    if (!users.find(u => u.email === receiver)) {
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

  return email;


}

function getSender(sessionId: SessionId) {
  const sessions = getSessions();
  const session = sessions.find(s => s.sessionId === sessionId);
  const userId = session?.userId;
  const users = getData().users;
  const addr = users.find(u => u.userId === userId)?.email;
  return addr;
}

export function sendMail(receivers: Receivers, title: Title, message: Message, session: SessionId) {
  console.log("Entering sendMail");
  // one or more receivers do not exist
  if (isValidReceiver(receivers) != true) {
    throw new Error(isValidReceiver(receivers) as string);
  }

  // title is greater thqn 50 characters
  if (isValidTitle(title) != true) {
    throw new Error(isValidTitle(title) as string);
  }

  const mailId = generateMailId();
  const newMail: Mail = {
    mailId: mailId,
    sender: getSender(session) as string,
    receivers: receivers,
    title: title,
    timeSent: new Date(),
    message: message,
    readBy: []
  }
  const dataStore = getData();
  dataStore.mails.push(newMail);
  setData(dataStore);
  
  console.log("Returning from sendMail");
  return { mailId: mailId };
}

function isValidMailId(mailId: MailId): string | boolean {
  const mails = getData().mails;
  if (!mails.find(m => m.mailId === mailId)) {
    return ErrorMap["MAIL_MISSING"];
  }
  return true;
}

export function deleteMail(mailIds: MailId[], userEmail: Email) {
  for (const mailId of mailIds) {
    if (isValidMailId(mailId) !== true) {
      throw new Error(isValidMailId(mailId) as string);
    }
  }

  const dataStore = getData();
  const mails = dataStore.mails;
  for (const mailId of mailIds) {
    const mail = mails.find(m => m.mailId === mailId) as Mail;
    mail.receivers = mail.receivers.filter(r => r != userEmail);

    if (mail.receivers.length == 0) {
      const index = mails.findIndex(m => m.mailId === mailId);
      dataStore.mails.splice(index, 1);
    }
  }
  setData(dataStore);
  return {};
}

export function readMail(mailId: MailId, session: SessionId) {
  if (isValidMailId(mailId) !== true) {
    throw new Error(isValidMailId(mailId) as string);
  }

  const data = getData();
  const mails = data.mails;
  const users = data.users;
  const sessions = getSessions();

  // assume sessions are handled correctly by middleware
  const mail = mails.find(m => m.mailId == mailId) as Mail;
  const userId = sessions.find(s => s.sessionId == session)?.userId as number;
  const email = users.find(u => u.userId === userId)?.email as string;
  mail.readBy.push(email);

  setData(data);
  return {};
}
