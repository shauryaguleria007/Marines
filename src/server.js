require("dotenv").config()

const express = require("express")
const passport = require("passport")
const cors = require("cors")
const path = require("path")

const { connectMongoDB } = require("./database/mongoDBconnection")
const { ErrorHandlerMiddleware } = require("./middleware/ErrorHandler/MiddlewareErrorHandlers")
const { enableUserPassportJwtStrategy, enableSellerPassportJwtStrategy } = require("./utility/passport/jwtStrategy")
const { enableUserGoogleStrategy, enableSellerGoogleStrategy } = require("./utility/passport/googleStrategy")
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
enableUserGoogleStrategy(passport)
enableSellerGoogleStrategy(passport)
server.use(Router)
server.use(ErrorHandlerMiddleware)
server.use(express.static(path.resolve(__dirname, '../dist')));
server.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
})

connectMongoDB().then(() => server.listen(process.env.PORT, () => {
    console.log(`server listning at port ${process.env.PORT}`);
})
).catch((error) => {
    console.log(`Database not connected . ${error.message}`);
})


