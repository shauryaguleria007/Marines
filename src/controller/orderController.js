const { OrderModal } = require("../modal/orderModel")
const { ProductModal } = require("../modal/productModel")
const { RouterAsyncErrorHandler } = require("../middleware/ErrorHandler/MiddlewareErrorHandlers")
const { Router } = require("express")
const mongoose = require("mongoose")
const { UserModal } = require("../modal/userModal")

exports.createOrder = RouterAsyncErrorHandler(async (req, res, next) => {
    const user = req.user
    const cart = user.cart
    cart.data.map(async (cartOrder) => {
        const product = await ProductModal.findById(cartOrder.product)
        if (!product) throw new Error()
        if (product?.stock < cartOrde?.quantity) throw new Error()
        const order = await OrderModal.create({
            user: user.id,
            seller: product.seller,
            product: product.id,
            quantity: cartOrder.quantity,
            bill_amount: product.price * cartOrder.quantity
        })
        if (!order) throw new Error()

        await product.updateOne({ stock: product.stock - order.quantity, sale: product.sale + order.quantity })
    })

    await user.updateOne({
        $unset: { cart: {} }
    })
    res.json({ success: true })
})


exports.getAllOrders = RouterAsyncErrorHandler(async (req, res, next) => {
    let filter = {}
    const user = req.user
    if (req.user.role === "USER") filter = { user: user.id }
    if (req.user.role === "SELLER") filter = { seller: user.id }

    const orders = await OrderModal.find(filter)
    if (!orders) throw new Error()

    res.json(orders)
})