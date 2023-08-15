const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mailToken: {
        token: {
            type: String
        },
        expiry: {
            type: Date
        }
    },
    role: {
        type: String,
        default: "USER"
    },
    verified: {
        type: Boolean,
        default: false
    },
    authentication: [{
        type: String,
        enum: ["OAUTH", "JWT"]
    }],
    cart: {
        total: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            default: 0
        },
        data: [{
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                default: 0,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                default: 0
            }
        }]
    },
    password: {
        type: String,
        select: false
    }
},
    { timestamps: true }
)


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
})

userSchema.methods.comparePassword = async function (password) {

    return await bcrypt.compare(password, this.password);

}


userSchema.methods.addVerificationToken = async function () {
    const token = crypto.randomBytes(64).toString('hex')
    const date = new Date
    const expiry = new Date((new Date).getTime() + 10 * 6000)
    this.mailToken = {
        token,
        expiry
    }
    await this.save()
    return token
}



exports.UserModal = mongoose.model("User", userSchema)