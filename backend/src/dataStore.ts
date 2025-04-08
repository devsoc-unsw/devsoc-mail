import fs from 'fs';
import  { v4 as uuidv4 } from 'uuid';
import { DataStore, Session, SessionStore } from './constants/types';

let sessionStore: SessionStore = { sessions: [] };
let database: DataStore = { users: [], mails: [] };

const SESSION_PATH = "./src/sessions.json";
const DATA_PATH = "./src/database.json";

////////////////////////////// SESSION UTILS  ////////////////////////////////

export function saveSessions() {
  const data = JSON.stringify(sessionStore, null, 2);
  fs.writeFileSync(SESSION_PATH, data, { flag: 'w' });
}

export function loadSessions() {
  if (fs.existsSync(SESSION_PATH)) {
    const data = fs.readFileSync(SESSION_PATH, { flag: 'r' });
    sessionStore = JSON.parse(data.toString());
  } else {
    // if file doesn't exist
    saveSessions();
  }
}

export function generateSessionId() {
  return uuidv4();
}

export function getSessions(): Session[] {
  return sessionStore.sessions;
}

export function setSessions(sessions: Session[]) {
  sessionStore.sessions = sessions;
  saveSessions();
}

////////////////////////////// DATA UTILS  ///////////////////////////////////

export function saveData() {
  const data = JSON.stringify(database, null, 2);
  fs.writeFileSync(DATA_PATH, data, { flag: 'w' });
}

export function loadData() {
  if (fs.existsSync(DATA_PATH)) {
    const data = fs.readFileSync(DATA_PATH, { flag: 'r' });
    database = JSON.parse(data.toString());
  } else {
    // if file doesn't exist
    saveData();
  }
}

export function getData() {
  return database;
}

export function setData(newData: DataStore) {
  database = newData;
  saveData();
}