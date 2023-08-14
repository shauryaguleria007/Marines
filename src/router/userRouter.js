const express = require("express")
const passport = require("passport")

const { check } = require("express-validator")
const { loginUser,
    registerUser,
    loginUserOauth,
    addToCart,
    sendVerificationMail,
    validateVerificationMail,
    authenticateUser,
    getFile,
    removeFromCart,
    getCart } = require("../controller/userController")
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
], routeCredentialValidator, registerUser)



Router.route("/login/google").get(passport.authenticate("userGoolgeStrategy"))
Router.route("/callback").get(passport.authenticate("userGoolgeStrategy", { session: false }), loginUserOauth)


Router.route("/login").post([
    check('email').exists().isEmail(),
    check('password').exists().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
], routeCredentialValidator, loginUser)

Router.route("/cart/data").get(passport.authenticate(["userJwtStrategy"], { session: false }), getCart)


Router.route("/cart/add").post(
    passport.authenticate(["userJwtStrategy"], { session: false }),
    [
        check("productId").exists().isMongoId(),
        check("quantity").exists().isInt({ gt: 0, lt: 10 })
    ], routeCredentialValidator, addToCart)

Router.route("/cart/remove").post(
    passport.authenticate(["userJwtStrategy"], { session: false }),
    [
        check("productId").exists().isMongoId()
    ],
    routeCredentialValidator,
    removeFromCart
)

Router.route("/verification/send").get(passport.authenticate(["userJwtStrategy"], { session: false }), sendVerificationMail)

Router.route("/verification/verify").get([
    check("id").exists().isMongoId(),
    check("token").exists()
],
    routeCredentialValidator,
    validateVerificationMail)

Router.route("/authenticate").get(passport.authenticate(["userJwtStrategy", "sellerJwtStrategy"], { session: false }), authenticateUser)

Router.route("/image/:imageId").get([
    check("imageId").exists().isMongoId()
], routeCredentialValidator, getFile)

module.exports = Router