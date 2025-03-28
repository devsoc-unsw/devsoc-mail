import fs from 'fs';

export const sessionStore = { sessions: [] };

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