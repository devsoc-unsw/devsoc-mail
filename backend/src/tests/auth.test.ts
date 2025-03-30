import { requestAuthRegister } from "./wrapper"

const SESSION = { 
  sessionId: expect.any(String),
  userId: expect.any(Number)
}

describe('Test register', () => {
  test('test 1', () => {
    const session = requestAuthRegister("Jessica", "jesse@devsoc.mail", "010203Ab!");
    expect(session.body).toStrictEqual(SESSION);
    expect(session.status).toStrictEqual(200);
  });
});