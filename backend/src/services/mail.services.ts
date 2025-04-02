import { ErrorMap } from "../constants/errors";
import { Mail, MailId, Message, Receivers, SessionId, Title, UserId } from "../constants/types";
import { getData, getSessions, setData } from "../dataStore";

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

function getSender(sessionId: SessionId) {
    const sessions = getSessions();
    const session = sessions.find(s => s.sessionId === sessionId);
    const userId = session?.userId;
    const users = getData().users;
    const addr = users.find(u => u.userId === userId)?.email;
    return addr;
}

export function sendMail(receivers: Receivers, title: Title, message: Message, session: SessionId) {
    // one or more receivers do not exist
    if (isValidReceiver(receivers) != true) {
        throw new Error(isValidReceiver(receivers) as string);
    }

    // title is greater thqn 50 characters
    if (isValidTitle(title) != true) {
        throw new Error(isValidTitle(title) as string);
    }

    const newMail: Mail = {
        mailId: generateMailId(),
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

    return {};
}