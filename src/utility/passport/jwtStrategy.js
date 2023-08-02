const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const { UserModal } = require("../../modal/userModal")
const { SellerModal } = require("../../modal/sellerModal")

exports.enableUserPassportJwtStrategy = (passport) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.userJWT,
    }

    passport.use(
        "userJwtStrategy",
        new JwtStrategy(opts, async (jwt_payload, done) => {
            const user = await UserModal.findById(jwt_payload.id).catch((error) => {
                return done(null, false)
            })
            if (user) return done(null, user)
            return done(null, false)
        })
    )
}



exports.enableSellerPassportJwtStrategy = (passport) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.sellerJWT,
    }

    passport.use(
        "sellerJwtStrategy",
        new JwtStrategy(opts, async (jwt_payload, done) => {
            const user = await SellerModal.findById(jwt_payload.id).catch((error) => {
                return done(null, false)
            })
            if (user) return done(null, user)
            return done(null, false)
        })
    )
}
