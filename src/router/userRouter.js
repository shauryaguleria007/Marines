const express = require("express")
const passport = require("passport")

const { check } = require("express-validator")
const { loginUser, logoutUser, registerUser, authenticateUser, authorizeUser } = require("../controller/userController")
const { routeCredentialValidator } = require("../middleware/routeCredentialValidator")
const { Authorizer } = require("../middleware/Authorizer")



const Router = express.Router()

Router.route("/register").post([
    check('email').exists().isEmail(),
    check('password').exists().isLength({ min: 8 }),
    check("name").exists().isLength({ min: 3 }),
    check("role").optional().isIn(["USER", "HOD", "ADMIN"])
], routeCredentialValidator, registerUser)




Router.route("/login").post([
    check('email').exists().isEmail(),
    check('password').exists().isLength({ min: 8 }),
], routeCredentialValidator, loginUser)

Router.route("/authenticate").get(passport.authenticate(["jwt"], { session: false }), authenticateUser)
Router.route("/authorizeuser").get(passport.authenticate(["jwt"], { session: false }), Authorizer(["USER"]), authorizeUser)
Router.route("/authorizeadmin").get(passport.authenticate(["jwt"], { session: false }), Authorizer(["ADMIN"]), authorizeUser)





module.exports = Router