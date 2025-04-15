import { sessionsCollection, usersCollection, mailsCollection } from "../db";
import { ObjectId } from "mongodb";

export async function clear() {
    // Clear sessions
    await sessionsCollection.updateOne(
        { _id: new ObjectId("sessions") },
        { $set: { sessions: [] } },
        { upsert: true }
    );
    
    // Clear users
    await usersCollection.updateOne(
        { _id: new ObjectId("placeholder") },
        { $set: { users: [] } },
        { upsert: true }
    );
    
    // Clear mails
    await mailsCollection.updateOne(
        { _id: new ObjectId("placeholder") },
        { $set: { mails: [] } },
        { upsert: true }
    );
    
    return {};
}