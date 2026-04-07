-- Users
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  inbox TEXT
);

-- Sessions
CREATE TABLE sessions (
  session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
);

-- Mail
CREATE TABLE mail (
  mail_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  time_sent TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Mail Received
CREATE TABLE mail_received (
  mail_received_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mail_id UUID NOT NULL REFERENCES mail(mail_id) ON DELETE CASCADE,
  receiver UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
);

-- Mail Read
CREATE TABLE mail_read (
  mail_read_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mail_id UUID NOT NULL REFERENCES mail(mail_id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  UNIQUE(mail_id, user_id) -- prevent duplicate read entries
);