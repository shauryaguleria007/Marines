

const GoogleStrategy = require("passport-google-oauth20").Strategy

const { isBuffer } = require("util")
const { UserModal } = require("../../modal/userModal")
const { SellerModal } = require("../../modal/sellerModal")
const { log } = require("console")




exports.enableUserGoogleStrategy = (passport) => {

    const authenticateUser = async (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json
        let user = await UserModal.findOne({ email }).select(["+password"])
        if (user) {
            if (!user.verified && !!user.password) {
                await user.updateOne({
                    $set: { verified: true },
                    $push: { authentication: "OAUTH" }
                })

                const newUser = await UserModal.findOne({ email })

                return done(null, newUser)

            }
            return done(null, user)
        }

        user = await UserModal.create({ name, email, authentication: ["OAUTH"], verified: true })
        if (user) return done(null, user)
        return done(null, false)
    }

    passport.use("userGoolgeStrategy", new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}/api/user/callback`,
            scope: ['profile', 'email'],
        },
        authenticateUser
    ))
}




exports.enableSellerGoogleStrategy = (passport) => {

    const authenticateUser = async (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json
        let user = await SellerModal.findOne({ email }).select(["+password"])
        if (user) {
            if (!user.verified && !!user.password) {
                console.log("user");
                await user.updateOne({
                    $set: { verified: true },
                    $push: { authentication: "OAUTH" }
                })
                const newUser = await UserModal.findOne({ email })
                return done(null, newUser)

            }

            return done(null, user)
        }

        user = await SellerModal.create({ name, email, authentication: ["OAUTH"], verified: true })
        if (user) return done(null, user)
        return done(null, false)
    }

    passport.use("sellerGoolgeStrategy", new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}/api/seller/callback`,
            scope: ['profile', 'email'],
        },
        authenticateUser
    ))
}