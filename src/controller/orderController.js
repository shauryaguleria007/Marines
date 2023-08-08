const { OrderModal } = require("../modal/orderModel")
const { ProductModal } = require("../modal/productModel")
const { RouterAsyncErrorHandler } = require("../middleware/ErrorHandler/MiddlewareErrorHandlers")
const { Router } = require("express")

exports.createOrder = RouterAsyncErrorHandler(async (req, res, next) => {
    res.json({ success: true })
})