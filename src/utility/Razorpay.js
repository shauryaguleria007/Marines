const Razorpay = require('razorpay');

exports.instance = new Razorpay({
    key_id: process.env.rezor_key_id,
    key_secret: process.env.rezor_secrete_key,
});


