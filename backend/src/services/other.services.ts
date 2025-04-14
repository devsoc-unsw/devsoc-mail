import { sessionsCollection, usersCollection, mailsCollection } from "../db";

export async function clear() {
    // Clear sessions
    await sessionsCollection.updateOne(
        { _id: 'sessions' },
        { $set: { sessions: [] } },
        { upsert: true }
    );
    
    // Clear users
    await usersCollection.updateOne(
        { _id: 'placeholder' },
        { $set: { users: [] } },
        { upsert: true }
    );
    
    // Clear mails
    await mailsCollection.updateOne(
        { _id: 'placeholder' },
        { $set: { mails: [] } },
        { upsert: true }
    );
    
    return {};
}