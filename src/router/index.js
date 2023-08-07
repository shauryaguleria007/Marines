const express = require("express")

const userRouter = require("./userRouter")
const sellerRouter = require("./sellerRouter")
const productRouter = require("./productRouter")
const orderRouter = require("./orderRouter")


const Router = express.Router()

Router.use("/api/user", userRouter)
Router.use("/api/product", productRouter)
Router.use("/api/order", orderRouter)
Router.use("/api/seller", sellerRouter)


module.exports = Router