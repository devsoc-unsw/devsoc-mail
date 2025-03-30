import { requestAuthLogin, requestAuthRegister } from "./wrapper"

const SESSION = { 
  sessionId: expect.any(String),
  userId: expect.any(Number)
}

const ERROR = { error: expect.any(String) };
const LONG_NAME = "Ramonaaaaaaaaaaaaaaaaaaaaaaaaa Flowersssssssssssssss Ramonaaaaaaaaaaaaaaaaaaaaaaaaa Flowersssssssssssssss"

describe('Test register', () => {
  test('Successful register', () => {
    const session = requestAuthRegister("Ramona Flowers", "ramona@devsoc.mail", "010203Ab!");
    expect(session.body).toStrictEqual(SESSION);
    expect(session.status).toStrictEqual(200);
  });

  test('Bad name (too short)', () => {
    const session = requestAuthRegister("", "ramona@devsoc.mail", "010203Ab!");
    expect(session.body).toStrictEqual(ERROR);
    expect(session.status).toStrictEqual(400);
  });

  test('Bad name (too long)', () => {
    const session = requestAuthRegister(LONG_NAME, "ramona@devsoc.mail", "010203Ab!");
    expect(session.body).toStrictEqual(ERROR);
    expect(session.status).toStrictEqual(400);
  });

  test('Bad email', () => {
    const session = requestAuthRegister("Ramona Flowers", "ramona@gmail.com", "010203Ab!");
    expect(session.body).toStrictEqual(ERROR);
    expect(session.status).toStrictEqual(400);
  });

  test('Bad password', () => {
    const session = requestAuthRegister("Ramona Flowers", "ramona@devsoc.mail", "abcabcabc");
    expect(session.body).toStrictEqual(ERROR);
    expect(session.status).toStrictEqual(400);
  });
});

/**
 * Implement /auth/login and uncomment the test below
 */
// describe('Test login', () => {
//   beforeEach(() => {
//     requestAuthRegister("", "ramona@devsoc.mail", "010203Ab!");
//   });

//   test('Successful login', () => {
//     const session = requestAuthLogin("ramona@devsoc.mail", "010203Ab!");
//     expect(session.body).toStrictEqual(SESSION);
//     expect(session.status).toStrictEqual(200);
//   });

//   test('Bad email (wrong suffix)', () => {
//     const session = requestAuthLogin("ramona@gmail.com", "010203Ab!");
//     expect(session.body).toStrictEqual(ERROR);
//     expect(session.status).toStrictEqual(400);
//   });

//   test('Bad email (not found)', () => {
//     const session = requestAuthLogin("ramona@gmail.com", "010203Ab!");
//     expect(session.body).toStrictEqual(ERROR);
//     expect(session.status).toStrictEqual(400);
//   });

//   test('Bad password', () => {
//     const session = requestAuthLogin("ramona@gmail.com", "abcabcabc");
//     expect(session.body).toStrictEqual(ERROR);
//     expect(session.status).toStrictEqual(400);
//   });
// });