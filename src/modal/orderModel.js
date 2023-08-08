const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    seller: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    bill_amount: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
)





exports.OrderModal = mongoose.model("Order", orderSchema)