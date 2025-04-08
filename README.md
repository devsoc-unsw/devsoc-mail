# devsoc mail

epic training program project

# Workshop 5 - Express

Author: Alyssa and Giselle

## Overview:
The backend handles behind-the-scenes logic, data processing and storage eg. handling requests and getting info from the database.
Express.js is a web framework for Node.js that is useful for building our backend. 

Here’s how it all connects:
1. The client (frontend) is what the user can see and interacts with. It sends a HTTP request to the backend.
2. The backend (Node.js) server uses Express to listen for requests from the client.
3. Express talks to the database to fetch/update information.
4. Express sends a response back to the client. 
5. The client can display this in the UI.

## Task 0: General setup 
`cd backend && npm i`
`backend/constants/errors.ts` This contains a map of error messages used when the server fails to make a request
`backend/constants/types.ts` This contains types (omg no way!!!) of different objects we are storing in the database. 


## Task 1: Setting up the server 
Inside `backend/index.ts` add the following imports
```ts
// backend/index.ts
import dotenv from "dotenv";              // Loads environment variables from a .env file
import express from "express";            // Framework to create the server and APIs
import authRoutes from './routes/auth.routes';
import mailRoutes from './routes/mail.routes';
import otherRoutes from './routes/other.routes';
import { PORT } from "../config.json"     // Uses a fallback config if .env doesn't have the port
import { errorMiddleware } from "./middleware";  // Handles API errors
import cors from "cors";                  // Enables CORS
import { loadData } from "./dataStore";   // Loads initial in-memory data (instead of DB)
```
This loads environment variables from a .env file into process.env.
```ts
// backend/index.ts
dotenv.config();
```

`app` is the express server
`port` is from an .env file or from config.json
```ts
// backend/index.ts
const app = express();
const port = process.env.PORT || PORT;
```
The following code runs the server. Start the backend with `npm run start`.
```ts
// backend/index.ts
app.listen(port, () => {
    console.log(`Devsoc-mail server is running at http://localhost:${port}`);
});
```
Load the data from database.json
```ts
//backend/index.ts
loadData();
```

Add the following for middleware and routes.
```ts
//backend/index.ts
app.use(express.json());     // Parses incoming JSON
app.use(cors());             // Allows cross-origin API calls
app.use('', otherRoutes);    // Hooks up routes
app.use('', authRoutes);
app.use('', mailRoutes);
app.use(errorMiddleware);    // Handles errors across the app
```
Add the following to make sure server closes.
```ts
//backend/index.ts
process.on("SIGINT", async () => {    
    console.log('Shutting down server.');
    process.exit();
});
```

## Task 2: Setting up the database
Inside `backend/dataStore.ts` add the following imports.
```ts
// backend/dataStore.ts
import fs from 'fs';                              // File system module to interact with JSON files
import { v4 as uuidv4 } from 'uuid';              // To generate unique session IDs
import { DataStore, Session, SessionStore } from './constants/types'; // Type definitions
```
> fs: This module helps in reading and writing to files (database.json and sessions.json).
> uuid: Used to generate unique session IDs.
> constants/types: This is where your custom TypeScript types (DataStore, Session, SessionStore) are defined.

Define variables for session and database.
```ts
// backend/dataStore.ts
let sessionStore: SessionStore = { sessions: [] };  // Store for user sessions in-memory
let database: DataStore = { users: [], mails: [] };  // Store for users and mails in-memory

const SESSION_PATH = "./src/sessions.json";  // Path to the session file
const DATA_PATH = "./src/database.json";    // Path to the data file (users & mails)
```
> sessionStore: In-memory object that holds session data.
> database: In-memory object for storing users and mails.
> SESSION_PATH and DATA_PATH: File paths where data will be saved.

This function writes the current session store to the `sessions.json` file:
```ts
// backend/dataStore.ts
export function saveSessions() {
  const data = JSON.stringify(sessionStore, null, 2);
  fs.writeFileSync(SESSION_PATH, data, { flag: 'w' }); // Saves the session data to a file
}
```

This function loads session data from the `sessions.json` file, or creates the file if it doesn’t exist:
```ts
// backend/dataStore.ts
export function loadSessions() {
  if (fs.existsSync(SESSION_PATH)) {
    const data = fs.readFileSync(SESSION_PATH, { flag: 'r' });
    sessionStore = JSON.parse(data.toString());  // Reads and loads session data
  } else {
    saveSessions();  // If file doesn't exist, create a new one
  }
}
```

This function generates a new unique session ID using `uuidv4`:
```ts
// backend/dataStore.ts
export function generateSessionId() {
  return uuidv4();  // Generates a unique session ID
}
```

This function returns the list of all active sessions:
```ts
// backend/dataStore.ts
export function getSessions(): Session[] {
  return sessionStore.sessions;  // Returns the current sessions stored in-memory
}

```
This function sets new session data in memory and saves it to the `sessions.json` file:
```ts
// backend/dataStore.ts
export function setSessions(sessions: Session[]) {
  sessionStore.sessions = sessions;  // Sets new session data and saves it
  saveSessions();
}
```

This function saves the current database object to the `database.json` file:
```ts
// backend/dataStore.ts
export function saveData() {
  const data = JSON.stringify(database, null, 2);
  fs.writeFileSync(DATA_PATH, data, { flag: 'w' }); // Saves the user and mail data to a file
}
```

This function loads data from `database.json` if it exists, or creates the file if it doesn’t.
```ts
// backend/dataStore.ts
export function loadData() {
  if (fs.existsSync(DATA_PATH)) {
    const data = fs.readFileSync(DATA_PATH, { flag: 'r' });
    database = JSON.parse(data.toString());  // Loads the data from file into memory
  } else {
    saveData();  // If file doesn't exist, create a new one
  }
}
```
This function returns the current database (users and mails) in memory.
```ts
// backend/dataStore.ts
export function getData() {
  return database;  // Returns the current user and mail data stored in-memory
}
```

This function sets new data in memory and writes it to `database.json`.
```ts
// backend/dataStore.ts
export function setData(newData: DataStore) {
  database = newData;  // Sets new user and mail data and saves it to the file
  saveData();
}
```

## Task 3: Setting up middleware
Inside `backend/middleware.ts`, add the following imports:
```ts
// backend/middleware.ts
import { Request, Response, NextFunction } from "express";   // Express request, response, and next function types
import { loadSessions, getSessions } from "./dataStore";       // Functions to manage sessions
import { ErrorMap, StatusCodeMap } from "./constants/errors";  // Error mappings
import { Session } from "./constants/types";                   // Session type definition
// import { getSessionsCollection } from "./db";               // Database session collection (commented out)
```
> express: The Express library is used for handling HTTP requests and middleware.
> dataStore: This module helps load and manage session data.
> constants/errors: This module contains error mappings for the application. constants/types: This module contains type definitions for Session.

This middleware function checks if a valid session exists in the request. If the session is invalid or not found, it returns an error:
```ts
// backend/middleware.ts

// Session check middleware
async function sessionMiddleware(req: Request, _res: Response, next: NextFunction) {
    try {
        loadSessions(); // Loads sessions from the session file
        const sessionId = req.header('session'); // Extracts session ID from the request header
        let sessions: Session[] = getSessions(); // Retrieves active sessions from memory
        const sessionExists = sessions.find(s => s.sessionId === sessionId); // Checks if the session exists

        if (!sessionId || !sessionExists) { // If no session or invalid session, return error
            return next({
                status: StatusCodeMap[ErrorMap["INVALID_SESSION"]],
                message: ErrorMap["INVALID_SESSION"]
            });
        } 

        next(); // Passes control to the next middleware if session is valid
    } catch (e) {
        console.error("Session Middleware Error:", e); // Logs any errors in session checking
        return next(e); // Passes the error to the next middleware
    }
}
```

This function catches and handles errors globally across the app. It sends an error response with the appropriate status code and error message:
```ts
// backend/middleware.ts

// Error catching and throwing middleware
function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    const message = err.message; // Retrieves error message
    const status = StatusCodeMap[message]; // Gets the status code based on error message
    res.status(status).json({ error: message }); // Sends error response with status and message
}
```

Finally, the middleware functions are exported so they can be used in the app’s routing:
```ts
// backend/middleware.ts
export { errorMiddleware, sessionMiddleware }; // Exports both middlewares for use in routing
```


## Task 4: Setting up routes
Inside the `backend/routes` directory,`auth.routes.ts`, `mail.routes.ts` and `other.routes.ts` files contain some routes. 

Each route can be associated with different HTTP methods, such as:
* GET: Used to fetch data from the server (e.g., retrieving information).
* POST: Used to submit data to the server (e.g., creating a new resource).
* PUT: Used to update an existing resource on the server.
* DELETE: Used to remove a resource from the server.


## Task 6: Set up backend logic
Backend logic in the directory `backend/services` get/update data from the database. For example, the below function registers a user and stores them in the database. 
```ts

/**
 * Registers and logs in a new email and returns a session
 * @param name
 * @param email
 * @param password
 */
export function authRegister(
  name: Name,
  email: Email,
  password: Password
): Session {
  // name is greater than 100 or less than 1 characters
  if (isValidName(name) !== true) {
    throw new Error(isValidName(name) as string);
  }

  // name is greater than 100 or less than 1 characters
  if (isValidEmail(email, true) !== true) {
    throw new Error(isValidEmail(email) as string);
  }

  // password should have 1 uppercase, 1 lowercase, and 1 number
  if (isValidPassword(password) !== true) {
    throw new Error(isValidPassword(password) as string);
  }

  const userId = generateUserId();

  const sessions: Session[] = getSessions();
  const session: Session = {
    sessionId: generateSessionId(),
    userId: userId,
  };
  sessions.push(session);
  setSessions(sessions);

  const database = getData();
  const user: User = {
    name: name,
    email: email,
    password: password,
    inbox: {},
    userId: userId
  };
  database.users.push(user);
  setData(database);

  return session;
}
```
Task: Write a function that logs a user in and returns a session ID. Then, write other functions that query the database for viewing all mail, viewing one email, deleting an email, marking an email as read, sending an email and logging out.
```ts
export function authLogin(email: Email, password: Password) {
  
// finish this

  return { sessionId: sessionId };
}
```

## Task 7: Setting up controllers
This function handles an incoming HTTP request (from the client). It extracts the name, email and password from the request body and calls the function `authRegister(name, email, password)` to register a user.
```ts
// backend/controllers/auth.controllers.ts
async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const auth = authService.authRegister(name, email, password);
    res.json(auth);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
```

Task: Implement a function to handle a login request. Afterward, implement other functions to handle other requests.
```ts
async function login(req: Request, res: Response) {
  try {
// finish this
  } catch (err: any) {

  }
}
```

## Task 8: Sending HTTP requests to backend
Now we want to send requests from the frontend. Navigate to `frontend/src/pages/RegisterPage.tsx`.
This function sends a POST request to register a user and navigates to the `/mail` page, otherwise throws an error.
```ts

  const handleRegister = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:${PORT}/auth/register`,
        { name: name, email: email, password: _password }
      );
      localStorage.setItem("sessionId", response.data.sessionId);
      const data = {
              email,
              loginTime: new Date(),
            };
      const dataString = JSON.stringify(data);
      localStorage.setItem("userData", dataString);
      navigate('/mail');
    } catch(err) {
      console.error(err);
    }
  }
```
Task: Go to `LoginPage.tsx` and add a POST request for the user to login. Then add the rest of the requests (Hint: Check if the request is POST/GET/PUT/DELETE by checking the routes).
```ts

  const handleLogin = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
    } catch(err) {
      console.error(err);
    }
  }
```
