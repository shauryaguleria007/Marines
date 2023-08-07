const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: "Seller",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: mongoose.Types.ObjectId
    }]
},
    { timestamps: true }
)





exports.ProductModal = mongoose.model("Product", productSchema)