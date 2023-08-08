const { createOrder } = require("../controller/orderController")



const express = require("express")
const passport = require("passport")

const { check } = require("express-validator")
const { routeCredentialValidator } = require("../middleware/routeCredentialValidator")


const Router = express.Router()

Router.route("/add").post(passport.authenticate(["userJwtStrategy"], { session: false }),
    [
        check("cartId").exists().isMongoId()
    ],
    routeCredentialValidator,
    createOrder)



module.exports = Router