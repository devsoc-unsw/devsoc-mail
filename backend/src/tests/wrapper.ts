import request, { HttpVerb } from 'sync-request-curl';
import { PORT } from "../../config.json"

interface RequestOptions {
  method: HttpVerb;
  path: string;
  payload?: object;
  token?: string;
}
  
const SERVER_URL = `http://localhost:${PORT}`;
const TIMEOUT_MS = 5000;

export function requestHelper({ method, path, payload, token }: RequestOptions): any {
  let query: any = {};
  let body: any = {};
  const header = { token };

  if (['PUT', 'POST'].includes(method)) {
    body = payload;
  } else {
    // GET/DELETE
    query = payload;
  }

  const res = request(method, SERVER_URL + path, { qs: query, json: body, headers: header, timeout: TIMEOUT_MS });
  const bodyString = res.body.toString();
  let bodyObject: any;
  try {
    bodyObject = {
      body: JSON.parse(bodyString),
      status: res.statusCode
    };
  } catch (err: any) {
    bodyObject = {
      error: `Server responded with ${res.statusCode}, but body is not JSON 
              GIVEN: ${bodyString} 
              REASON: ${err.message}
              HINT: Did you res.json(undefined)?`,
      status: res.statusCode
    };
  }
  return bodyObject;
}

export function requestAuthRegister(name: string, email: string, password: string) {
  return requestHelper({
    method: 'POST',
    path: '/auth/register',
    payload: { name, email, password }
  });
}

export function requestAuthLogin(email: string, password: string) {
  return requestHelper({
    method: 'POST',
    path: '/auth/login',
    payload: { email, password }
  });
}