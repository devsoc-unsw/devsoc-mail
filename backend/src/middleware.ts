import { Request, Response, NextFunction } from "express";
import { ErrorMap, StatusCodeMap } from "./constants/errors";
import { Session } from "./constants/types";
import { sessionsCollection } from "./db";
import { ObjectId } from "mongodb";

// Session check middleware
async function sessionMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const sessionId = req.header("session");

    if (!sessionId) {
      return next({
        status: StatusCodeMap[ErrorMap["INVALID_SESSION"]],
        message: ErrorMap["INVALID_SESSION"],
      });
    }

    // Query MongoDB directly for the session

    const sessionDoc = await sessionsCollection.findOne({
      sessionId: sessionId
    });
    
    // const sessionDoc = await sessionsCollection.findOne({});
    // if (!sessionDoc) {
    //   return next({
    //     status: StatusCodeMap[ErrorMap["INVALID_SESSION"]],
    //     message: ErrorMap["INVALID_SESSION"],
    //   });
    // }

    //const session = sessionDoc.sessions.find((s: any) => s.sessionId === sessionId);

    console.log("sessionDoc: ", sessionDoc);

    if (!sessionDoc) {
      return next({
        status: StatusCodeMap[ErrorMap["INVALID_SESSION"]],
        message: ErrorMap["INVALID_SESSION"],
      });
    }

    // Attach the session to the request for later use
    (req as any).userId = sessionDoc.userId;

    next();
  } catch (e) {
    console.error("Session Middleware Error:", e);
    return next(e);
  }
}

// Error catching and throwing middleware
function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const message = err.message;
  const status = StatusCodeMap[message] || 500;
  res.status(status).json({ error: message });
}

// Create a middleware that provides user data
function withUser(handler: (req: Request, res: Response) => Promise<void>) {
  return async (req: Request, res: Response) => {
    try {
      await handler(req, res);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}

export { errorMiddleware, sessionMiddleware, withUser };
