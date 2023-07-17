

const { validationResult } = require('express-validator')
const { credentialError } = require("./ErrorHandler/customError")


exports.routeCredentialValidator = (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
        const result = validationResult(req).errors[0]
        throw new credentialError(result.path)
    } else return next()
}
