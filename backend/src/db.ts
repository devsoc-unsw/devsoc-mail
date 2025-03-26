
// // example route: get the first 50 results from the users collection
// router.get("/", async (req: Request, res: Response) => {
//     let results = await usersCollection.find({})
//       .limit(50)
//       .toArray();
//     res.send(results).status(200);
// });

// Establish connection to the mongoDB database
import { Db, MongoClient } from "mongodb";
import { Mail, Session, User } from "./constants/types";

let client: MongoClient;
let database: Db;

async function dbConnect() {
    const connectionString = process.env.ATLAS_URI || "";
    client = new MongoClient(connectionString);
    let conn;
    try {
        conn = await client.connect();
        console.log("Connected to MongoDB!");
        database = conn.db("devsoc-mail");
    } catch(e) {
        console.error(e);
    }
}

function getMailCollection() {
    return database.collection<Mail>('mail');
}

function getUsersCollection() {
    return database.collection<User>('users');
}

function getSessionsCollection() {
    return database.collection<Session>('sessions');
}

async function dbDisconnect() {
    await client.close();
    console.log("MongoDB connection closed");
}

export { 
    dbConnect, 
    dbDisconnect,
    getMailCollection, 
    getUsersCollection, 
    getSessionsCollection 
}

// Old test code: (leave for now)
// const newUser: User = {
//     _id: new ObjectId(),
//     email: "email@devsoc.app",
//     password: "password",
//     inbox: new Map()
// }
// const result = await usersCollection.insertOne(newUser);
// const user = await usersCollection.findOne({ _id: result.insertedId });
// console.log(user);

// let results = await usersCollection.find({})
//     .limit(50)
//     .toArray();
// console.log(results);