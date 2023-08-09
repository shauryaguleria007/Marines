const { sendMail } = require("./nodeMailerTransporter")




exports.verificationMail = async ({ email, client, token, role }) => {
    const html = `<h1>Click on the link below to verify your ${role} account on Apni Mandi.</h1>
    <a href="${process.env.SERVER_URL}/api/user/verification/verify?id=${client}&token=${token}" target="_blank">Verify email</a>`
    return await sendMail({
        to: email,
        subject: "Apni mandi account verification .",
        html
    })
}

