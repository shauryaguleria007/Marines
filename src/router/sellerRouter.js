const express = require("express")
const passport = require("passport")

const { check } = require("express-validator")
const { loginSeller, registerSeller } = require("../controller/sellerController")
const { routeCredentialValidator } = require("../middleware/routeCredentialValidator")



const Router = express.Router()

Router.route("/register").post([
    check('email').exists().isEmail(),
    check('password').exists().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    check("name").exists().isLength({ min: 3 }),
], routeCredentialValidator, registerSeller)




Router.route("/login").post([
    check('email').exists().isEmail(),
    check('password').exists().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
], routeCredentialValidator, loginSeller)





module.exports = Router