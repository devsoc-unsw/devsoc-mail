// Error enum with an error code and an error message
// Note that you can use an ENUM in typescript but for demonstration purposes 
// this will be a js dictionary
const ErrorMap =  {
    // Generic errors
    "INVALID_SESSION": "Invalid session. Please log in again.",
    "USER_DOES_NOT_EXIST": "User does not exist. Please log in again.",
    
    // Registration errors
    "NAME_TOO_LONG": "Your name must be less than 50 characters.",
    "NAME_TOO_SHORT": "Your name must be greater than 1 character.",

    "EMAIL_TOO_LONG": "Your email address must be less than 50 characters.",
    "EMAIL_TOO_SHORT": "Your email address must be greater than 1 character.",
    "EMAIL_ALREADY_EXISTS": "Your email address already exists.",
    "EMAIL_SUFFIX": "Your email must have the suffix @devsoc.mail.",

    "PASSWORD_LENGTH": "Your password must have more than 6 characters.",
    "PASSWORD_SYMBOLS": "Your password must have at least 1 uppercase, 1 lowercase and 1 number.",

    // Login errors
    "PASSWORD_INCORRECT": "Your password is incorrect.",
    "EMAIL_DOES_NOT_EXIST": "Email does not exist.",

    // Mail errors
    "MAIL_MISSING": "The mail you requested could not be found.",

    // Mail send errors
    "MAIL_TITLE_LENGTH": "Your title must be less than 50 characters.",
    "RECEIVER_MISSING": "One or more of your receivers do not exist."
}

// Maps error messages from the enum ErrorMap to HTTP status codes
const StatusCodeMap = {
    [ErrorMap["INVALID_SESSION"]]: 401,
    [ErrorMap["USER_DOES_NOT_EXIST"]]: 400,

    [ErrorMap["NAME_TOO_LONG"]]: 400,
    [ErrorMap["NAME_TOO_SHORT"]]: 400,

    [ErrorMap["EMAIL_TOO_LONG"]]: 400,
    [ErrorMap["EMAIL_TOO_SHORT"]]: 400,
    [ErrorMap["EMAIL_ALREADY_EXISTS"]]: 400,
    [ErrorMap["EMAIL_SUFFIX"]]: 400,
    
    [ErrorMap["PASSWORD_LENGTH"]]: 400,
    [ErrorMap["PASSWORD_SYMBOLS"]]: 400,

    [ErrorMap["PASSWORD_INCORRECT"]]: 400,
    [ErrorMap["EMAIL_DOES_NOT_EXIST"]]: 400,

    [ErrorMap["MAIL_MISSING"]]: 400,
    
    [ErrorMap["MAIL_TITLE_LENGTH"]]: 400,
    [ErrorMap["RECEIVER_MISSING"]]: 400
}

export { ErrorMap, StatusCodeMap }