//import fs from 'fs';
import  { v4 as uuidv4 } from 'uuid';
import { DataStore, Session, SessionStore } from './constants/types';
import { MongoClient } from 'mongodb';
import * as dotenv from "dotenv";

let sessionStore: SessionStore = { sessions: [] };
let database: DataStore = { users: [], mails: [] };

//const SESSION_PATH = "./src/sessions.json";
//const DATA_PATH = "./src/database.json";

let sessionCollection: any;
let dataCollection: any;

export async function connectToDatabase() {
  try {
    dotenv.config();
    const atlasUri = process.env.ATLAS_URI;
    if (!atlasUri) {
      throw new Error('ATLAS_URI environment variable is undefined');
    }

    const client: MongoClient = new MongoClient(atlasUri);

    await client.connect();
    const db = client.db();
    console.log(`Successfully connected to database: ${db.databaseName}`);
    sessionCollection = db.collection('sessions');
    dataCollection = db.collection('data');
    console.log(`Collection: ${sessionCollection.collectionName} found`);
    console.log(`Collection: ${dataCollection.collectionName} found`);

  } catch (error) {
    console.error('Error found when connecting to MongoDB: ', error);
  }
}
////////////////////////////// SESSION UTILS  ////////////////////////////////

export async function saveSessions() {
  // const data = JSON.stringify(sessionStore, null, 2);
  // fs.writeFileSync(SESSION_PATH, data, { flag: 'w' });
  try {
    await sessionCollection.deleteMany({});
    await sessionCollection.insertMany(sessionStore.sessions);
  } catch (error) {
    console.error('Error saving sessions:', error);
  }
}

export async function loadSessions() {
  // if (fs.existsSync(SESSION_PATH)) {
  //   const data = fs.readFileSync(SESSION_PATH, { flag: 'r' });
  //   sessionStore = JSON.parse(data.toString());
  // } else {
  //   // if file doesn't exist
  //   saveSessions();
  // }
  try {
    const sessions = await sessionCollection.find({}).toArray();
    sessionStore.sessions = sessions;
  } catch (error) {
    console.error('Error loading sessions:', error);
  }
}

export function generateSessionId() {
  return uuidv4();
}

export function getSessions(): Session[] {
  return sessionStore.sessions;
}

export async function setSessions(sessions: Session[]) {
  sessionStore.sessions = sessions;
  await saveSessions();
}

////////////////////////////// DATA UTILS  ///////////////////////////////////

export async function saveData() {
  // const data = JSON.stringify(database, null, 2);
  // fs.writeFileSync(DATA_PATH, data, { flag: 'w' });
  try {
    await dataCollection.deleteOne({});
    await dataCollection.insertOne(database);
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

export async function loadData() {
  // if (fs.existsSync(DATA_PATH)) {
  //   const data = fs.readFileSync(DATA_PATH, { flag: 'r' });
  //   database = JSON.parse(data.toString());
  // } else {
  //   // if file doesn't exist
  //   saveData();
  // }
  try {
    const data = await dataCollection.findOne({});
    if (data) {
      database = data;
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

export function getData() {
  return database;
}

export async function setData(newData: DataStore) {
  database = newData;
  await saveData();
}