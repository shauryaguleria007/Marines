const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const { UserModal } = require("../../modal/userModal")

exports.enablePassportJwtStrategy = (passport) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT,
    }

    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            const user = await UserModal.findById(jwt_payload.id).catch((error) => {
                return done(null, false)
            })
            if (user) return done(null, user)
            return done(null, false)
        })
    )
}
