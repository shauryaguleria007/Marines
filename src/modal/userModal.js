const mongoose = require("mongoose")
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
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



exports.UserModal = mongoose.model("User", userSchema)