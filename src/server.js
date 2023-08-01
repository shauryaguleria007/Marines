require("dotenv").config()

const express = require("express")
const passport = require("passport")
const cors = require("cors")

const { connectMongoDB } = require("./database/mongoDBconnection")
const { ErrorHandlerMiddleware } = require("./middleware/ErrorHandler/MiddlewareErrorHandlers")
const { enableUserPassportJwtStrategy, enableSellerPassportJwtStrategy } = require("./utility/passport/jwtStrategy")
const Router = require("./router")




const server = express()
server.use(cors({
    origin: [`${process.env.CLIENT_URL}`],
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"]
}))
server.use(express.json())
server.use(passport.initialize())
enableUserPassportJwtStrategy(passport)
enableSellerPassportJwtStrategy(passport)
server.use(Router)
server.use(ErrorHandlerMiddleware)


connectMongoDB().then(() => server.listen(process.env.PORT, () => {
    console.log(`server listning at port ${process.env.PORT}`);
})
).catch((error) => {
    console.log(`Database not connected . ${error.message}`);
})


