const mongoose = require("mongoose")
exports.connectMongoDB = async () => {
    await mongoose
        .set('strictQuery', false)
        .connect(process.env.mongoDBConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("database connected");
        })
        .catch((error) => {
            throw error
        })
}


