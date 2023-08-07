const { } = require("../controller/orderController")



const express = require("express")
const passport = require("passport")

const { check } = require("express-validator")
const { routeCredentialValidator } = require("../middleware/routeCredentialValidator")


const Router = express.Router()



module.exports = Router