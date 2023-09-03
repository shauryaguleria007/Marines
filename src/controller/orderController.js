const { OrderModal } = require("../modal/orderModel")
const { ProductModal } = require("../modal/productModel")
const { RouterAsyncErrorHandler } = require("../middleware/ErrorHandler/MiddlewareErrorHandlers")
const { Router } = require("express")
const mongoose = require("mongoose")
const { instance } = require("../utility/Razorpay")
const { UserModal } = require("../modal/userModal")

exports.createOrder = RouterAsyncErrorHandler(async (req, res, next) => {
    const user = req.user
    const cart = user.cart
    await Promise.all(cart.data.map(async (cartOrder) => {
        const product = await ProductModal.findById(cartOrder.product)
        if (!product) throw new Error()
        if (product?.stock < cartOrder?.quantity) throw new Error()
        const order = await OrderModal.create({
            user: user.id,
            seller: product.seller,
            product: product.id,
            quantity: cartOrder.quantity,
            bill_amount: product.price * cartOrder.quantity
        })
        if (!order) throw new Error()

        await product.updateOne({ stock: product.stock - order.quantity, sale: product.sale + order.quantity })
    }))

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

    const orders = await OrderModal.find(filter).populate("product").populate({
        path: "user",
        select: ["name"]
    })
    if (!orders) throw new Error()

    res.json(orders)
})



exports.checkout = RouterAsyncErrorHandler(async (req, res, next) => {
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.send({
        success: true,
        order,
    })
})


exports.verify = RouterAsyncErrorHandler(async (req, res, next) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    console.log(razorpay_order_id, razorpay_payment_id);
    //   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    //     req.body;
    //   const body = razorpay_order_id + "|" + razorpay_payment_id;
    //   const expectedSignature = crypto
    //     .createHmac("sha256", process.env.rezor_secrete_key)
    //     .update(body.toString())
    //     .digest("hex");
    // const isAuthentic=expectedSignature===razorpay_signature;
    res.redirect(`${process.env.CLIENT_URL}/user`)
}
)