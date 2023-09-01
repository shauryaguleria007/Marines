const { createOrder, getAllOrders } = require("../controller/orderController")



const express = require("express")
const passport = require("passport")

const { check } = require("express-validator")
const { routeCredentialValidator } = require("../middleware/routeCredentialValidator")


const Router = express.Router()

Router.route("/add").post(passport.authenticate(["userJwtStrategy"], { session: false }), createOrder)


Router.route("/get/all").get(
    passport.authenticate(["userJwtStrategy", "sellerJwtStrategy"], { session: false }), 
    getAllOrders
)
module.exports = Router