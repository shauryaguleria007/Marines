require("dotenv").config()

const express = require("express")
const passport = require("passport")
const cors = require("cors")

const { connectMongoDB } = require("./database/mongoDBconnection")
const { ErrorHandlerMiddleware } = require("./middleware/ErrorHandler/MiddlewareErrorHandlers")
const { enablePassportJwtStrategy } = require("./utility/passport/jwtStrategy")
const Router = require("./router")




const server = express()
server.use(cors({
    origin: [`${process.env.CLIENT_URL}`],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"   
}))
server.use(express.json())
server.use(passport.initialize())
enablePassportJwtStrategy(passport)
server.use(Router)
server.use(ErrorHandlerMiddleware)


connectMongoDB().then(() => server.listen(process.env.PORT, () => {
    console.log(`server listning at port ${process.env.PORT}`);
})
).catch((error) => {
    console.log(`Database not connected . ${error.message}`);
})


