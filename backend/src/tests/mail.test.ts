import { requestAuthRegister, requestMailSend } from "./wrapper";

const ERROR = { error: expect.any(String) };
const LONG_TITLE = "Howdy!Howdy!Howdy!Howdy!Howdy!Howdy!Howdy!Howdy!Howdy!Howdy!";

describe.skip('Test send mail (error cases)', () => {
    test('Invalid session', () => {
        requestAuthRegister("Ramona Flowers", "ramona@devsoc.mail", "abcABC12#");
        const res = requestMailSend(["ramona@devsoc.mail"], "Howdy!", 
            "hi can i copy your assignment pls", "notASession1234567"
        );
        expect(res.body).toStrictEqual(ERROR);
        expect(res.status).toStrictEqual(401);
    });

    test('Receivers do not exist', () => {
        const sender = requestAuthRegister("Ramona Flowers", "ramona@devsoc.mail", "abcABC12#");
        const res = requestMailSend(["scott@devsoc.mail"], "Howdy!", 
            "hi can i copy your assignment pls", sender.body.sessionId
        );
        expect(res.body).toStrictEqual(ERROR);
        expect(res.status).toStrictEqual(400);
    });

    test('Title is greater than 50 chars', () => {
        // receiver
        requestAuthRegister("Scott Pilgrim", "scott@devsoc.mail", "abcABC12#");
        // sender
        const sender = requestAuthRegister("Ramona Flowers", "ramona@devsoc.mail", "abcABC12#");
        const res = requestMailSend(["scott@devsoc.mail"], LONG_TITLE, 
            "hi can i copy your assignment pls", sender.body.sessionId
        );
        expect(res.body).toStrictEqual(ERROR);
        expect(res.status).toStrictEqual(400);
    });
});

describe.skip('Test send mail (success cases)', () => {
    // I'm to ceebs, avoid using any guys =v=
    let sender: any;

    beforeEach(() => {
        sender = requestAuthRegister("Ramona Flowers", "ramona@devsoc.mail", "abcABC12#");
        requestAuthRegister("Knives Chau", "knives@devsoc.mail", "abcABC12#");
        requestAuthRegister("Wallace Wells", "wallace@devsoc.mail", "abcABC12#");
    });

    test('All valid', () => {
        const res = requestMailSend(["knives@devsoc.mail", "wallace@devsoc.mail"], "Hihi", 
            "hi can i copy your assignment pls", sender.body.sessionId
        );
        expect(res.body).toStrictEqual({});
        expect(res.status).toStrictEqual(200);
    });

    // feel free to add more
});