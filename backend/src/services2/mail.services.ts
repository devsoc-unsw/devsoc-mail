import { ErrorMap } from "../constants/errors";
import { UserId, MailId, Receivers, Title, Message, Email } from "../constants/types";
import { getSupabaseClient } from "../db2";

const sb = () => getSupabaseClient();

function generateMailId(): number {
  return Math.floor(Date.now() * Math.random() * (999999 - 100000 + 1)) + 100000;
}

function isValidTitle(title: Title): string | boolean {
  if (title.length > 50) return ErrorMap["MAIL_TITLE_LENGTH"];
  return true;
}

async function getUserIdByEmail(email: string): Promise<string | null> {
  const { data } = await sb().from("users").select("user_id").eq("email", email).single();
  return data?.user_id ?? null;
}

async function getEmailByUserId(userId: string): Promise<string | null> {
  const { data } = await sb().from("users").select("email").eq("user_id", userId).single();
  return data?.email ?? null;
}

async function isValidReceiver(receivers: Receivers): Promise<string | boolean> {
  for (const email of receivers) {
    const { data } = await sb().from("users").select("user_id").eq("email", email).single();
    if (!data) return ErrorMap["RECEIVER_MISSING"];
  }
  return true;
}

async function isValidMailId(mailId: MailId): Promise<string | boolean> {
  const { data } = await sb().from("mail").select("mail_id").eq("mail_id", mailId).single();
  if (!data) return ErrorMap["MAIL_MISSING"];
  return true;
}

export async function viewAllMail(email: string, userId: string) {
  const { data: user } = await sb().from("users").select("user_id").eq("user_id", userId).single();
  if (!user) throw new Error(ErrorMap["USER_DOES_NOT_EXIST"]);

  const receiverUserId = await getUserIdByEmail(email);
  if (!receiverUserId) throw new Error(ErrorMap["USER_DOES_NOT_EXIST"]);

  // Join mail_received → mail to get all mails for this user
  const { data: mails, error } = await sb()
    .from("mail_received")
    .select(`
      mail_received_id,
      mail (mail_id, sender, title, message, time_sent)
    `)
    .eq("receiver", receiverUserId);

  if (error) throw new Error(error.message);
  return { mails: mails?.map((r: any) => r.mail) ?? [] };
}

export async function getEmail(userId: UserId, mailId: MailId) {
  if ((await isValidMailId(mailId)) !== true) throw new Error((await isValidMailId(mailId)) as string);

  const { data: user } = await sb().from("users").select("user_id").eq("user_id", userId).single();
  if (!user) throw new Error(ErrorMap["USER_DOES_NOT_EXIST"]);

  const { data: mail, error } = await sb().from("mail").select("*").eq("mail_id", mailId).single();
  if (error || !mail) throw new Error(ErrorMap["EMAIL_DOES_NOT_EXIST"]);

  return mail;
}

export async function sendMail(receivers: Receivers, title: Title, message: Message, userId: UserId) {
  if ((await isValidReceiver(receivers)) !== true) throw new Error((await isValidReceiver(receivers)) as string);
  if (isValidTitle(title) !== true) throw new Error(isValidTitle(title) as string);

  const senderEmail = await getEmailByUserId(userId);
  if (!senderEmail) throw new Error(ErrorMap["USER_DOES_NOT_EXIST"]);

  const mailId = generateMailId();

  const { error: mailError } = await sb().from("mail").insert({
    mail_id: mailId,
    sender: userId,
    title,
    message,
  });
  if (mailError) throw new Error(mailError.message);

  // Insert one row per receiver into mail_received
  for (const email of receivers) {
    const receiverUserId = await getUserIdByEmail(email);
    if (!receiverUserId) throw new Error(ErrorMap["RECEIVER_MISSING"]);

    const { error } = await sb().from("mail_received").insert({
      mail_id: mailId,
      receiver: receiverUserId,
    });
    if (error) throw new Error(error.message);
  }

  return { mailId };
}

export async function deleteMail(mailIds: MailId[], userEmail: Email) {
  for (const mailId of mailIds) {
    if ((await isValidMailId(mailId)) !== true) throw new Error((await isValidMailId(mailId)) as string);
  }

  const userId = await getUserIdByEmail(userEmail);
  if (!userId) throw new Error(ErrorMap["USER_DOES_NOT_EXIST"]);

  for (const mailId of mailIds) {
    // Remove this user from mail_received
    await sb().from("mail_received").delete().eq("mail_id", mailId).eq("receiver", userId);

    // If no receivers left, delete the mail entirely
    const { data: remaining } = await sb()
      .from("mail_received")
      .select("mail_received_id")
      .eq("mail_id", mailId);

    if (!remaining || remaining.length === 0) {
      await sb().from("mail_read").delete().eq("mail_id", mailId);
      await sb().from("mail").delete().eq("mail_id", mailId);
    }
  }

  return {};
}

export async function readMail(mailId: MailId, userId: UserId) {
  if ((await isValidMailId(mailId)) !== true) throw new Error((await isValidMailId(mailId)) as string);

  // Upsert into mail_read — UNIQUE(mail_id, user_id) prevents duplicates
  const { error } = await sb().from("mail_read").upsert(
    { mail_id: mailId, user_id: userId },
    { onConflict: "mail_id,user_id" }
  );
  if (error) throw new Error(error.message);

  return {};
}

export async function clear() {
  await sb().from("mail_read").delete().neq("mail_read_id", "00000000-0000-0000-0000-000000000000");
  await sb().from("mail_received").delete().neq("mail_received_id", "00000000-0000-0000-0000-000000000000");
  await sb().from("mail").delete().neq("mail_id", -1);
  await sb().from("sessions").delete().neq("session_id", "00000000-0000-0000-0000-000000000000");
  await sb().from("users").delete().neq("user_id", "00000000-0000-0000-0000-000000000000");
  return {};
}