const mongoose = require("mongoose")
const bcrypt = require('bcrypt');


const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
    ,
    verified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "SELLER",
    },
    authentication: [{
        type: String,
        enum: ["OAUTH", "JWT"]
    }],
    password: {
        type: String,
        select: false
    }

},
    { timestamps: true }
)


sellerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
})

sellerSchema.methods.comparePassword = async function (password) {

    return await bcrypt.compare(password, this.password);

}



exports.SellerModal = mongoose.model("Seller", sellerSchema)