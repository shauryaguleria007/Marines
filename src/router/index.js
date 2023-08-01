const express = require("express")

const userRouter = require("./userRouter")
const sellerRouter = require("./sellerRouter")


const Router = express.Router()

Router.use("/api/user", userRouter)
Router.use("/api/seller", sellerRouter)


module.exports = Router