import fs from 'fs';
import  { v4 as uuidv4 } from 'uuid';
import { Session, SessionStore } from './constants/types';

export const sessionStore: SessionStore = { sessions: [] };

export function saveSessions() {
  const data = JSON.stringify(sessionStore, null, 2);
  fs.writeFileSync('sessions.json', data, { flag: 'w' });
}

export function loadSessions() {
  if (fs.existsSync('sessions.json')) {
    const data = fs.readFileSync('sessions.json', { flag: 'r' });
    sessionStore.sessions = JSON.parse(data.toString());
  } else {
    // if file doesn't exist
    saveSessions();
  }
}

export function generateSessionId() {
  return uuidv4();
}

export function getSessions() {
  return sessionStore.sessions;
}

export function setSessions(sessions: Session[]) {
  sessionStore.sessions = sessions;
  saveSessions();
}