// import { ObjectId } from "mongodb"

// Auth
export type SessionId = string
export type Name = string
export type UserId = number
export type Email = string //ends with "@devsoc.mail"
export type Password = string //greater than 6 characters & (?=.*\d)(?=.*[a-z])(?=.*[A-Z])

// Mail
export type MailId = number // should be unique for EVERY user
export type Sender = Email
export type Receivers = Email[]
export type Title = string // max 50 characters
export type TimeSent = Date //js date
export type Message = string

export type Read = boolean

// Deleting Mail
export type MailIds = MailId[]

// Database Types
export type UserMail = {MailId: Read} 

export type Session = {
	// _id: ObjectId,
	sessionId: SessionId, 
	userId: UserId
}

export type User = {
    // _id: ObjectId,
	email: Email
	password: Password
	inbox: UserMail
}

export type Mail = {
	// _id: ObjectId,
	mailId: MailId,
	sender: Sender,
	receivers: Receivers,
	title: Title,
	timeSent: TimeSent,
	message: Message,
	readBy: Array<UserId>
}

export type SessionStore = {
	sessions: Session[]
}