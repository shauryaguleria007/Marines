exports.passwordValidationError = class extends Error {
    constructor(message) {
        super(`${message} is invalid`)
        this.name = 'passwordValidationError'
        this.path = "password"
    }
}


exports.credentialError = class extends Error {
    constructor(message) {
        super(`${message} is invalid`)
        this.name = 'credentialError'
        this.path = message
    }
}


exports.internalServerError = class extends Error {
    constructor() {
        super("internal server error")
        this.name = "internalServerError"
    }
}


exports.authenticationError = class extends Error {
    constructor() {
        super(`you are not authenticated`)
        this.name = 'authenticationError'
    }
}