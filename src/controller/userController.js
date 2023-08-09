
const jwt = require("jsonwebtoken")
const { UserModal } = require("../modal/userModal")
const { ProductModal } = require("../modal/productModel")
const { RouterAsyncErrorHandler } = require("../middleware/ErrorHandler/MiddlewareErrorHandlers")
const { internalServerError, credentialError } = require("../middleware/ErrorHandler/customError")
const { verificationMail } = require("../utility/mailer/verificationMail")
const { Router } = require("express")


exports.registerUser = RouterAsyncErrorHandler(async (req, res, next) => {
    const { email, password, name } = req.body
    const user = await UserModal.create({ email, name, password, authentication: ["JWT"] })
    if (user) {
        const token = jwt.sign(
            {
                id: user.id,
            },

            process.env.userJWT,
            { expiresIn: '1d' }
        )
        return res.json({ token: "Bearer " + token })

    }
    else throw new internalServerError()
})




exports.loginUser = RouterAsyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await UserModal.findOne({ email }).select(["+password"])
    if (!user) throw new credentialError("email")
    if (!user.authentication.includes("JWT")) throw new Error()
    if (!await user.comparePassword(password)) throw new credentialError("password")
    const token = jwt.sign(
        {
            id: user.id,
        },

        process.env.userJWT,
        { expiresIn: '1d' }
    )
    return res.json({ token: "Bearer " + token })
})

exports.loginUserOauth = RouterAsyncErrorHandler(async (req, res, next) => {
    const user = req.user
    if (!user.authentication.includes("OAUTH")) throw new Error()
    const token = jwt.sign(
        {
            id: user.id,
        },

        process.env.userJWT,
        { expiresIn: '1d' }
    )

    return res.json({ token: "Bearer " + token })
})


exports.logoutUser = RouterAsyncErrorHandler(async (req, res, next) => {
    return res.json({ success: true })
})


exports.deleteUser = RouterAsyncErrorHandler(async (req, res, next) => {

    return res.json({ success: true })
})

exports.addToCart = RouterAsyncErrorHandler(async (req, res, next) => {
    const { productId, quantity } = req.body
    const product = await ProductModal.findById(productId)
    if (!product) throw new Error()
    const cartProduct = req.user.cart.find(pro => pro.product.toString() === productId)
    if (cartProduct) cartProduct.quantity += Number(quantity)
    else req.user.cart.push({ product: productId, quantity })
    await req.user.save()
    res.json({
        success: true
    })
})

exports.removeFromCart = RouterAsyncErrorHandler(async (req, res, next) => {
    const { productId } = req.body
    await req.user.updateOne({ $pull: { cart: { product: productId } } })
    res.json({ success: true })
})

exports.sendVerificationMail = RouterAsyncErrorHandler(async (req, res, next) => {
    const user = req.user
    if (user.verified) throw new Error()
    const token = await user.addVerificationToken()
    await verificationMail({
        email: user.email,
        client: user.id,
        token,
        role: user.role
    })
    res.json({ success: true })
})


exports.validateVerificationMail = RouterAsyncErrorHandler(async (req, res, next) => {
    const { id, token } = req.query
    const user = await UserModal.findById(id)
    if (!user || user.verified) throw new Error()
    if (token !== user.mailToken.token || (new Date) > user.mailToken.expiry) throw new Error()
    user.verified = true
    await user.save()
    res.json({ success: true })
})