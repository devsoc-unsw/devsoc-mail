import { sessionsCollection, usersCollection, mailsCollection } from "../db";
import { ObjectId } from "mongodb";

// doesn't work but I think you shouldn't be able to clear from a route design wise anyways lol

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