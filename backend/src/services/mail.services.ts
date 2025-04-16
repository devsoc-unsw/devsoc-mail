import { WithId } from "mongodb";
import { ErrorMap } from "../constants/errors";
import {
  UserId,
  MailId,
  Receivers,
  Title,
  Message,
  Mail,
  Email,
} from "../constants/types";
import { mailsCollection, usersCollection } from "../db";

export async function viewAllMail(email: string, userId: string) {
  
  // Get users from MongoDB
  const user = await usersCollection.findOne({
    userId: userId
  });

  // Check if user exists
  if (!user || user === undefined) {
    throw new Error(ErrorMap["USER_DOES_NOT_EXIST"]);
  }
  // Get mails from MongoDB
  const emails = await mailsCollection.find({ receivers: email }).toArray();
  return { mails: emails };

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

export async function getEmail(userId: UserId, mailId: MailId) {
  if ((await isValidMailId(mailId)) !== true) {
    throw new Error((await isValidMailId(mailId)) as string);
  }

  // Get mails from MongoDB
  const mails = await mailsCollection.find().toArray() as WithId<Mail>[];

  // Find mail by ID
  const email = mails.find((m: WithId<Mail>) => m.mailId == mailId);
  if (!email || email === undefined) {
    throw new Error(ErrorMap["EMAIL_DOES_NOT_EXIST"]);
  }

  // Find user by userId
  const user = await usersCollection.findOne({
    userId: userId
  });

  if (!user || user === undefined) {
    console.log("user not found");
    throw new Error(ErrorMap["USER_DOES_NOT_EXIST"]);
  }
  
  return email;
}

async function getSender(userId: UserId) {
  // Find user by ID
  const user = await usersCollection.findOne({ userId });
  return user?.email;
}

export async function sendMail(
  receivers: Receivers,
  title: Title,
  message: Message,
  userId: UserId
) {
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
    sender: (await getSender(userId)) as string,
    receivers: receivers,
    title: title,
    timeSent: new Date(),
    message: message,
    readBy: [],
  };

  // Add mail to MongoDB
  await mailsCollection.insertOne(newMail);

  return { mailId: mailId };
}

async function isValidMailId(mailId: MailId): Promise<string | boolean> {
  // Get mails from MongoDB
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
  const mails = await mailsCollection.find().toArray() as WithId<Mail>[];

  // Process each mail
  for (const mailId of mailIds) {
    const mail = mails.find((m: Mail) => m.mailId === mailId) as Mail;
    mail.receivers = mail.receivers.filter((r) => r != userEmail);
    if (mail.receivers.length == 0) {
      // Remove mail from MongoDB if no receivers left
      await mailsCollection.deleteOne({mailId: mailId});
    } else {
      // Update mail in MongoDB
      await mailsCollection.updateOne(
        {mailId: mailId },
        { $set: { receivers: mail.receivers } }
      );
    }
  }

  return {};
}

export async function readMail(mailId: MailId, userId: UserId) {
  if ((await isValidMailId(mailId)) !== true) {
    throw new Error((await isValidMailId(mailId)) as string);
  }

  // Get mails from MongoDB
  const mails = await mailsCollection.find().toArray() as WithId<Mail>[];

  // Get users from MongoDB
  const users = await usersCollection.find().toArray();

  // Find mail by ID
  const mail = mails.find((m: Mail) => m.mailId == mailId) as Mail;

  const email = users.find((u: any) => u.userId === userId)?.email as string;

  // Mark mail as read if not already
  if (!mail.readBy.includes(email)) {
    mail.readBy.push(email);

    // Update mail in MongoDB
    await mailsCollection.updateOne(
      { mailId: mailId},
      { $set: { readBy: mail.readBy } }
    );
  }

  return {};
}
