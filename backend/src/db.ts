import { MongoClient, Collection, Db, ObjectId } from "mongodb";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

let client: MongoClient;
let db: Db;

// Collections
export let sessionsCollection: Collection;
export let usersCollection: Collection;
export let mailsCollection: Collection;
export let dataCollection: Collection;

export async function connectToDatabase() {
  try {


    // MAKE SURE TO FOLLOW ALONG DURING DEMO - TO FILL OUT



  } catch (error) {
    console.error("Error found when connecting to MongoDB: ", error);
  }
}

export async function closeDatabaseConnection() {
  // uncomment once connectToDatabase is written
  
  // if (client) {
  //   await client.close();
  //   console.log("Database connection closed");
  // }
}
