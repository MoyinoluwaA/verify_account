const nodemailer = require('nodemailer')

const sendEmail = async(body, type) => {
    try {
        const { email } = body
    
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
                clientId: process.env.OAUTH_CLIENTID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN
            }
        })
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Moyin from Verify Account" <dayoh14@gmail.com>',
            to: email,
            subject: type === reset ? 'Reset password' : 'Verify Email',
            html: type === reset ? 
                `<b>Reset your password</b>. 
                Click 
                <a href="${process.env.FRONTEND_BASE_URL}/users/reset/${email}" target='_blank'>here</a>
                to reset your password`
            :
                `<b>Verify email to be able to continue with your account</b>. 
                Click 
                <a href="${process.env.FRONTEND_BASE_URL}/users/verify/${email}" target='_blank'>here</a>
                to verify your email`, 
        })
    
        console.log("Message sent: %s", info.messageId);
        
    }
    catch(err) {
        next(err)
    }
}

module.exports = {
    sendEmail
}