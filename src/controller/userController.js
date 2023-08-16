
const jwt = require("jsonwebtoken")
const { UserModal } = require("../modal/userModal")
const { ProductModal } = require("../modal/productModel")
const { RouterAsyncErrorHandler } = require("../middleware/ErrorHandler/MiddlewareErrorHandlers")
const { internalServerError, credentialError } = require("../middleware/ErrorHandler/customError")
const { verificationMail } = require("../utility/mailer/verificationMail")
const { getGFS } = require("../database/mongoDBconnection")
const mongoose = require("mongoose")


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

    return res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`)

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
    if (product.stock < quantity) throw new Error()
    const cartProduct = req.user.cart.data.find(pro => pro.product.toString() === productId)
    if (cartProduct) cartProduct.quantity += Number(quantity)
    else req.user.cart.data.push({ product: productId, quantity, name: product.name, price: product.price })
    req.user.cart.total += 1
    req.user.cart.price += product.price
    await req.user.save()
    res.json({
        success: true
    })
})

exports.removeFromCart = RouterAsyncErrorHandler(async (req, res, next) => {
    const { productId } = req.body
    const user = req.user
    const getProduct = await ProductModal.findById(productId)
    if (!getProduct) throw new Error()
    const product = user.cart.data.find(pro => pro.product.toString() === productId)
    const newTotal = user.cart?.total - product.quantity
    await user.updateOne({
        $set: {
            "cart.total": newTotal,
            "cart.price": user.cart.price - (product.quantity * getProduct.price)
        },
        $pull: { "cart.data": { product: productId } }
    })
    res.json({ success: true })
})

exports.sendVerificationMail = RouterAsyncErrorHandler(async (req, res, next) => {
    const user = req.user
    if (user.verified) return res.redirect(`${process.env.CLIENT_URL}/`)
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
    //redirect on email verification .
    res.redirect(`${process.env.CLIENT_URL}`)
})



exports.authenticateUser = RouterAsyncErrorHandler(async (req, res, next) => {
    const data = {}
    const user = req.user
    data.name = user.name
    data.role = user.role
    data.email = user.email
    data.verified = user.verified
    data.id = user.id
    res.json(data)
})


exports.getFile = RouterAsyncErrorHandler(async (req, res, next) => {
    const { imageId } = req.params
    const gfs = getGFS();
    const imageStream = gfs.openDownloadStream(new mongoose.Types.ObjectId(imageId));
    imageStream.on('error', (error) => {
        console.error('Error fetching image:', error);
        res.status(404).send('Image not found');
    })

    imageStream.pipe(res)
})

exports.getCart = RouterAsyncErrorHandler(async (req, res, next) => {
    res.json(req.user.cart)
})