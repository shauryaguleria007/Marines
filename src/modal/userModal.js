const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

const { passwordValidationError, internalServerError } = require("../middleware/ErrorHandler/customError")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: (input) => `${input.value} is not a valid email address`,
        }
    }
    ,
    role: {
        type: String,
        default: "USER",
        enum: ["USER", "SELLER", "ADMIN"],
        message: '{VALUE} is not a valid role',
        required: true

    },
    password: {
        type: String,
        required: true,
        select: false
    }

},
    { timestamps: true }
)


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        if (!passwordRegex.test(this.password))
            return next(new passwordValidationError(this.password))

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
})

userSchema.methods.comparePassword = async function (password) {

    return await bcrypt.compare(password, this.password);

}


const disableUpdateMethodsPlugin = (schema) => {
    const updateMethods = [
        'updateOne',
        'updateMany',
        'findOneAndUpdate',
        'replaceOne',
    ]

    updateMethods.forEach((method) => {
        schema.statics[method] = () => {
            throw new Error(`Method '${method}' is disabled.`)
        };
    });
};




userSchema.plugin(disableUpdateMethodsPlugin);

exports.UserModal = mongoose.model("User", userSchema)