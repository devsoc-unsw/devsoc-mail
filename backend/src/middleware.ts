import { Request, Response, NextFunction } from "express";
import { ErrorMap, StatusCodeMap } from "./constants/errors";
// import { getSessionsCollection } from "./db";

// Session check middleware
async function sessionMiddleware(req: Request, _res: Response, next: NextFunction) {
    const sessionId = req.header('session');
    // const sessions = getSessionsCollection();
    // const sessionExists = await sessions.find({ sessionId: sessionId }).hasNext()

    // if(sessionId && sessionExists) {
    //     // Next error rather than throw is due to this being an asynchronous function
    //     next(ErrorMap.INVALID_SESSION);
    // } else {
    //     next();
    // }
}

// Error catching and throwing middleware
function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    const message = err.message;
    const status = StatusCodeMap[message];
    res.status(status).json({ error: message });
}

export { errorMiddleware, sessionMiddleware };