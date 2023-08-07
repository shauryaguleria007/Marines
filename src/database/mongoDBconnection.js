const mongoose = require("mongoose")
let gfs



exports.connectMongoDB = async () => {

    const connection = mongoose.connection

    connection.once('open', () => {
        gfs = new mongoose.mongo.GridFSBucket(connection.db, {
            bucketName: "uploads"
        })
    })

    
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


exports.getGFS = () => gfs