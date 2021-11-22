const nodemailer = require('nodemailer')

const sendEmail = async(body, first_name, type) => {
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
            subject: type === 'reset' ? 'Reset password' : 'Verify your email for VeriA',
            html: type === 'reset' ? 
                `<b>Reset your password</b>. 
                Click 
                <a href="${process.env.FRONTEND_BASE_URL}/users/reset/${email}" target='_blank'>here</a>
                to reset your password`
            :
                `<b>You're nearly there!</b><br/>
                <p>Hi ${first_name},</p>
                <p>To finish setting up your account and start using VeriA, confirm we've got the right email for you.</p> 
                Click 
                <a href="${process.env.FRONTEND_BASE_URL}/users/verify/${email}" target='_blank'>here</a>
                to verify your email`, 
        })
    
        console.log("Message sent: %s", info.messageId);
        
    }
    catch(err) {
        console.log(err)
    }
}

module.exports = {
    sendEmail
}