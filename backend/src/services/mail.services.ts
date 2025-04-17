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

//
// DEMO (MAKE SURE TO FOLLOW ALONG)
//
export async function viewAllMail(email: string, userId: string) {
  
  // Get users from MongoDB

  // Check if user exists

  // Get mails from MongoDB

  //return { mails: emails };
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

//
// Exercise 1 - getEmail (COMPLETE THIS FUNCTION)
//
export async function getEmail(userId: UserId, mailId: MailId) {

  if ((await isValidMailId(mailId)) !== true) {
    throw new Error((await isValidMailId(mailId)) as string);
  }

  // Get mails from MongoDB

  // Find mail by ID

  if (!email || email === undefined) {
    throw new Error(ErrorMap["EMAIL_DOES_NOT_EXIST"]);
  }

  // Find user by userId

  if (!user || user === undefined) {
    console.log("user not found");
    throw new Error(ErrorMap["USER_DOES_NOT_EXIST"]);
  }
  
  //return email;
}

async function getSender(userId: UserId) {
  // Find user by ID
  const user = await usersCollection.findOne({ userId });
  return user?.email;
}

//
// Exercise 2 - sendMail (COMPLETE THIS FUNCTION)
//
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

  // Add mail to MongoDB

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

//
// Exercise 3 - readMail (COMPLETE THIS FUNCTION)
//
export async function readMail(mailId: MailId, userId: UserId) {
  if ((await isValidMailId(mailId)) !== true) {
    throw new Error((await isValidMailId(mailId)) as string);
  }

  // Get mails from MongoDB

  // Get users from MongoDB

  // Find mail by ID
  const mail = mails.find((m: Mail) => m.mailId == mailId) as Mail;

  const email = users.find((u: any) => u.userId === userId)?.email as string;

  // Mark mail as read if not already
  if (!mail.readBy.includes(email)) {
    mail.readBy.push(email);

    // Update mail in MongoDB
  }

  return {};
}
