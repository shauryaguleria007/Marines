
const jwt = require("jsonwebtoken")
const { UserModal } = require("../modal/userModal")
const { RouterAsyncErrorHandler } = require("../middleware/ErrorHandler/MiddlewareErrorHandlers")
const { internalServerError, credentialError, authenticationError } = require("../middleware/ErrorHandler/customError")


exports.registerUser = RouterAsyncErrorHandler(async (req, res, next) => {
    const { email, password, name } = req.body
    const role = req.body?.role || "USER"
    const user = await UserModal.create({ email, name, role, password })
    if (user) {
        console.log(user.id);
        const token = jwt.sign(
            {
                id: user.id,
            },

            process.env.JWT,
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

    if (!await user.comparePassword(password)) throw new credentialError("password")
    const token = jwt.sign(
        {
            id: user.id,
        },

        process.env.JWT,
        { expiresIn: '1d' }
    )
    return res.json({ token: "Bearer " + token })
})


exports.authenticateUser = RouterAsyncErrorHandler(async (req, res, next) => {
    if (!req.user) throw new authenticationError()
    res.json({
        path: `/${req.user.role.toLowerCase()}/home`
    })
})

exports.authorizeUser = RouterAsyncErrorHandler(async (req, res, next) => {
    if (!req.user) throw new authenticationError()
    res.json({
        name: req.user.name,
        email: req.user.email,
    })
})


exports.logoutUser = RouterAsyncErrorHandler(async (req, res, next) => {
    return res.json({ success: true })
})


exports.deleteUser = RouterAsyncErrorHandler(async (req, res, next) => {

    return res.json({ success: true })
})