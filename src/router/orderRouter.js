const { createOrder, getAllOrders } = require("../controller/orderController")



const express = require("express")
const passport = require("passport")

const { check } = require("express-validator")
const { routeCredentialValidator } = require("../middleware/routeCredentialValidator")


const Router = express.Router()

Router.route("/add").post(passport.authenticate(["userJwtStrategy"], { session: false }), createOrder)


Router.route("/get/all").post(
    passport.authenticate(["userJwtStrategy", "sellerJwtStrategy"], { session: false }), [
    check("sellerId").optional().isMongoId(),
    check("userId").optional().isMongoId()
],
    routeCredentialValidator,
    getAllOrders
)
module.exports = Router