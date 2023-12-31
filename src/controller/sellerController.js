const jwt = require("jsonwebtoken")
const { SellerModal } = require("../modal/sellerModal")
const { RouterAsyncErrorHandler } = require("../middleware/ErrorHandler/MiddlewareErrorHandlers")
const { internalServerError, credentialError } = require("../middleware/ErrorHandler/customError")


exports.registerSeller = RouterAsyncErrorHandler(async (req, res, next) => {
    const { email, password, name } = req.body
    const user = await SellerModal.create({ email, name, password, authentication: ["JWT"] })
    if (user) {
        console.log(user.id);
        const token = jwt.sign(
            {
                id: user.id,
            },

            process.env.sellerJWT,
            { expiresIn: '1d' }
        )
        return res.json({ token: "Bearer " + token })

    }
    else throw new internalServerError()
})




exports.loginSeller = RouterAsyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await SellerModal.findOne({ email }).select(["+password"])
    if (!user) throw new credentialError("email")
    if (!user.authentication.includes("JWT")) throw new Error()

    if (!await user.comparePassword(password)) throw new credentialError("password")
    const token = jwt.sign(
        {
            id: user.id,
        },

        process.env.sellerJWT,
        { expiresIn: '1d' }
    )
    return res.json({ token: "Bearer " + token })
})


exports.loginSellerOauth = RouterAsyncErrorHandler(async (req, res, next) => {
    const user = req.user
    if (!user.authentication.includes("OAUTH")) throw new Error()
    const token = jwt.sign(
        {
            id: user.id,
        },

        process.env.sellerJWT,
        { expiresIn: '1d' }
    )
    return res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`)
})


exports.logoutSeller = RouterAsyncErrorHandler(async (req, res, next) => {
    return res.json({ success: true })
})


exports.deleteSeller = RouterAsyncErrorHandler(async (req, res, next) => {

    return res.json({ success: true })
})


