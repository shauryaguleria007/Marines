const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport(
    {
        service: 'Gmail',
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASSWORD
        }
    }
)


exports.sendMail = async ({ to, subject, html }) => {
    return exports.transporter.sendMail({
        from: `${process.env.MAIL_ID}`,
        to,
        subject,
        html
    })
}



