import { ObjectId, WithId } from "mongodb";
import { ErrorMap } from "../constants/errors";
import {
  UserId,
  SessionId,
  MailId,
  Receivers,
  Title,
  Message,
  Mail,
  Email,
  Session,
} from "../constants/types";
import { mailsCollection, sessionsCollection, usersCollection } from "../db";

export async function viewAllMail(email: string, userId: string) {
  try {
    // Convert string userId to ObjectId if needed
    //const userObjectId = new ObjectId(userId);

    // Get users from MongoDB
    const user = await usersCollection.findOne({
      userId: userId
    });
    // const users = usersDoc?.users || [];

    // Check if user exists
    // const user = users.find((user: any) => user.email === email);
    if (!user || user === undefined) {
      throw new Error(ErrorMap["USER_DOES_NOT_EXIST"]);
    }

    // Get mails from MongoDB

    // const mailsDoc = await mailsCollection.findOne({
    //   _id: new ObjectId("placeholder"),
    // });
    // const mails = mailsDoc?.mails || [];

    const mails = await mailsCollection.find().toArray() as WithId<Mail>[];
    //const allMails: Mail[] = mails.flatMap((mails) => mails.mails);

    // Filter mails by receiver
    //console.log(allMails);
    const emails = mails.filter((mail: Mail) => mail.receivers.includes(email));
    //console.log(emails);

    return { mails: emails };
  } catch (error) {
    // Handle error
  }
}

function generateMailId(): MailId {
  return (
    Math.floor(Date.now() * Math.random() * (999999 - 100000 + 1)) + 100000
  );
}

async function isValidReceiver(
  receivers: Receivers
): Promise<string | boolean> {
  // Get users from MongoDB
  // const usersDoc = await usersCollection.findOne({
  //   _id: new ObjectId("placeholder"),
  // });
  // const users = usersDoc?.users || [];

  const users = await usersCollection.find().toArray();
  for (const receiver of receivers) {
    if (!users.find((u: any) => u.email === receiver)) {
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

export async function getEmail(session: SessionId, mailId: MailId) {
  if ((await isValidMailId(mailId)) !== true) {
    throw new Error((await isValidMailId(mailId)) as string);
  }

  // Get mails from MongoDB

  // const mailsDoc = await mailsCollection.findOne({
  //   _id: new ObjectId("placeholder"),
  // });
  // const mails = mailsDoc?.mails || [];

  const mails = await mailsCollection.find().toArray() as WithId<Mail>[];
  //const allMails: Mail[] = mails.flatMap((mails) => mails.mails);

  // Get sessions from MongoDB

  // const sessionsDoc = await sessionsCollection.findOne({
  //   _id: new ObjectId("sessions"),
  // });
  // const sessions = sessionsDoc?.sessions || [];

  const sessions = await sessionsCollection.find().toArray();

  // Find mail by ID
  const email = mails.find((m: Mail) => m.mailId == mailId) as Mail;
  if (!email || email === undefined) {
    throw new Error(ErrorMap["EMAIL_DOES_NOT_EXIST"]);
  }

  // Find user by session
  const user = sessions.find((s: any) => s.sessionId == session)
    ?.userId as number;
  if (!user || user === undefined) {
    throw new Error(ErrorMap["USER_DOES_NOT_EXIST"]);
  }
  //console.log(email);
  return email;
}

async function getSender(sessionId: SessionId) {
  // Get sessions from MongoDB

  // const sessionsDoc = await sessionsCollection.findOne({
  //   _id: new ObjectId("sessions"),
  // });
  // const sessions = sessionsDoc?.sessions || [];

  const sessions = await sessionsCollection.find().toArray() as WithId<Session>[];

  // Find session by ID
  const session = sessions.find((s: any) => s.sessionId === sessionId);
  const userId = session?.userId;

  // Get users from MongoDB
  
  // const usersDoc = await usersCollection.findOne({
  //   _id: new ObjectId("placeholder"),
  // });
  // const users = usersDoc?.users || [];

  const users = await usersCollection.find().toArray();

  // Find user by ID
  const addr = users.find((u: any) => u.userId === userId)?.email;
  return addr;
}

export async function sendMail(
  receivers: Receivers,
  title: Title,
  message: Message,
  session: SessionId
) {
  console.log("Entering sendMail");

  // Validate receivers
  if ((await isValidReceiver(receivers)) != true) {
    throw new Error((await isValidReceiver(receivers)) as string);
  }

  // Validate title
  if (isValidTitle(title) != true) {
    throw new Error(isValidTitle(title) as string);
  }

  // Generate mail ID
  const mailId = generateMailId();

  // Create mail
  const newMail: Mail = {
    mailId: mailId,
    sender: (await getSender(session)) as string,
    receivers: receivers,
    title: title,
    timeSent: new Date(),
    message: message,
    readBy: [],
  };

  // Add mail to MongoDB
  //const mailIdObj = new ObjectId();

  // await mailsCollection.updateOne(
  //   { _id: mailIdObj },
  //   { $push: { mails: newMail } as any },
  //   { upsert: true }
  // );

  await mailsCollection.insertOne(newMail);

  console.log("Returning from sendMail");
  return { mailId: mailId };
}

async function isValidMailId(mailId: MailId): Promise<string | boolean> {
  // Get mails from MongoDB

  // const mailsDoc = await mailsCollection.findOne({
  //   _id: new ObjectId("placeholder"),
  // });
  // const mails = mailsDoc?.mails || [];
  const mails = await mailsCollection.find().toArray() as WithId<Mail>[];
  
  if (!mails.find((m: Mail) => m.mailId === mailId)) {
    return ErrorMap["MAIL_MISSING"];
  }
  return true;
}

export async function deleteMail(mailIds: MailId[], userEmail: Email) {
  for (const mailId of mailIds) {
    if ((await isValidMailId(mailId)) !== true) {
      throw new Error((await isValidMailId(mailId)) as string);
    }
  }

  // Get mails from MongoDB

  // const mailsDoc = await mailsCollection.findOne({
  //   _id: new ObjectId("placeholder"),
  // });
  // const mails = mailsDoc?.mails || [];

  const mails = await mailsCollection.find().toArray() as WithId<Mail>[];
  //const allMails: Mail[] = mails.flatMap((mails) => mails.mails);
  // Process each mail
  for (const mailId of mailIds) {
    const mail = mails.find((m: Mail) => m.mailId === mailId) as Mail;
    mail.receivers = mail.receivers.filter((r) => r != userEmail);
    const mailIdObj = new ObjectId();
    if (mail.receivers.length == 0) {
      // Remove mail from MongoDB if no receivers left
      await mailsCollection.updateOne(
        { _id: mailIdObj },
        { $pull: { mails: { mailId: mailId } } as any },
        { upsert: true }
      );
    } else {
      // Update mail in MongoDB
      await mailsCollection.updateOne(
        { _id: mailIdObj, "mails.mailId": mailId },
        { $set: { "mails.$.receivers": mail.receivers } }
      );
    }
  }

  return {};
}

export async function readMail(mailId: MailId, session: SessionId) {
  if ((await isValidMailId(mailId)) !== true) {
    throw new Error((await isValidMailId(mailId)) as string);
  }

  // Get data from MongoDB

  // const mailsDoc = await mailsCollection.findOne({
  //   _id: new ObjectId("placeholder"),
  // });
  // const mails = mailsDoc?.mails || [];

  const mails = await mailsCollection.find().toArray() as WithId<Mail>[];

  // const usersDoc = await usersCollection.findOne({
  //   _id: new ObjectId("placeholder"),
  // });
  // const users = usersDoc?.users || [];

  const users = await usersCollection.find().toArray();

  // const sessionsDoc = await sessionsCollection.findOne({
  //   _id: new ObjectId("sessions"),
  // });
  // const sessions = sessionsDoc?.sessions || [];

  const sessions = await sessionsCollection.find().toArray();

  // Find mail by ID
  const mail = mails.find((m: Mail) => m.mailId == mailId) as Mail;

  // Find user by session
  const userId = sessions.find((s: any) => s.sessionId == session)
    ?.userId as number;
  const email = users.find((u: any) => u.userId === userId)?.email as string;

  // Mark mail as read if not already
  if (!mail.readBy.includes(email)) {
    mail.readBy.push(email);

    // Update mail in MongoDB
    const mailIdObj = new ObjectId();
    await mailsCollection.updateOne(
      { _id: mailIdObj, "mails.mailId": mailId },
      { $set: { "mails.$.readBy": mail.readBy } }
    );
  }

  return {};
}
