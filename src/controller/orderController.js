const { OrderModal } = require("../modal/orderModel")
const { ProductModal } = require("../modal/productModel")
const { RouterAsyncErrorHandler } = require("../middleware/ErrorHandler/MiddlewareErrorHandlers")
const { Router } = require("express")
const mongoose = require("mongoose")

exports.createOrder = RouterAsyncErrorHandler(async (req, res, next) => {
    const { cartId } = req.body

    const user = req.user

    const cartOrder = user.cart.find(ord => ord.id === cartId)
    const product = await ProductModal.findById(cartOrder.product)
    if (product.stock < cartOrder.quantity) throw new Error()

    const order = await OrderModal.create({
        user: user.id,
        seller: product.seller,
        product: product.id,
        quantity: cartOrder.quantity,
        bill_amount: product.price * cartOrder.quantity
    })
    if (!order) throw new Error()

    await user.updateOne({
        $pull: { cart: { product: product.id } },
        $push: { order: order.id }
    })

    res.json({ success: true })
})