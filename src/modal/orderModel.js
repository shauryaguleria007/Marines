const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({

},
    { timestamps: true }
)





exports.OrderModal = mongoose.model("Order", orderSchema)