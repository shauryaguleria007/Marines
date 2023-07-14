const express = require("express")


const server = express()



server.get("/", (req, res) => {
    res.send("<h1>Hello World.</h1>")
})

server.listen("3000", () => {
    console.log("server started at port 3000");
})