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
    //console.log("view all mail called");
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
    //console.log("user email is " + user.email);
    // Get mails from MongoDB

    // const mailsDoc = await mailsCollection.findOne({
    //   _id: new ObjectId("placeholder"),
    // });
    // const mails = mailsDoc?.mails || [];

    //const mails = await mailsCollection.find().toArray() as WithId<Mail>[];
    //const allMails: Mail[] = mails.flatMap((mails) => mails.mails);

    // Filter mails by receiver
    //console.log(allMails);
    //const emails = mails.filter((mail: Mail) => mail.receivers.includes(email));
    const emails = await mailsCollection.find({ receivers: email }).toArray();
    //const plainEmails = emails.map(({ _id, ...rest }) => rest);
    //console.log("emails are " + JSON.stringify({mails: plainEmails}, null, 2));
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

export async function getEmail(userId: UserId, mailId: MailId) {
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

  //const sessions = await sessionsCollection.find().toArray();

  // Find mail by ID
  const email = mails.find((m: WithId<Mail>) => m.mailId == mailId);
  if (!email || email === undefined) {
    throw new Error(ErrorMap["EMAIL_DOES_NOT_EXIST"]);
  }

  // Find user by session
  // const user = sessions.find((s: any) => s.sessionId == session)
  //   ?.userId as number;

  // const session = await sessionsCollection.findOne({ sessionId });
  // const user = session?.userId;
  
  const user = await usersCollection.findOne({
    userId: userId
  });

  if (!user || user === undefined) {
    console.log("user not found");
    throw new Error(ErrorMap["USER_DOES_NOT_EXIST"]);
  }
  delete (email as any)._id;

  console.log("email found is: " + JSON.stringify({ mail: email }, null, 2));
  console.log("user found is: " + JSON.stringify(user, null, 2));
  return email;
}

async function getSender(userId: UserId) {
  //const users = await usersCollection.find().toArray();
  // Find user by ID
  const user = await usersCollection.findOne({ userId });
  console.log("found user " + user);
  //const addr = users.find((u: any) => u.userId === userId)?.email;
  return user?.email;
}

export async function sendMail(
  receivers: Receivers,
  title: Title,
  message: Message,
  userId: UserId
) {
  //console.log("Entering sendMail");

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
  //const mailIdObj = new ObjectId();

  // await mailsCollection.updateOne(
  //   { _id: mailIdObj },
  //   { $push: { mails: newMail } as any },
  //   { upsert: true }
  // );

  await mailsCollection.insertOne(newMail);

  //console.log("Returning from sendMail");
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

  // Process each mail
  for (const mailId of mailIds) {
    const mail = mails.find((m: Mail) => m.mailId === mailId) as Mail;
    mail.receivers = mail.receivers.filter((r) => r != userEmail);
    if (mail.receivers.length == 0) {
      // Remove mail from MongoDB if no receivers left
      // await mailsCollection.updateOne(
      //   { _id: mailIdObj },
      //   { $pull: { mails: { mailId: mailId } } as any },
      //   { upsert: true }
      // );
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

  //const sessions = await sessionsCollection.find().toArray();

  // Find mail by ID
  const mail = mails.find((m: Mail) => m.mailId == mailId) as Mail;

  // Find user by session
  // const userId = sessions.find((s: any) => s.sessionId == session)
  //   ?.userId as number;

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
