const axios = require('axios').default

const verifyAccount = async body => {
    const { account_number, bank_code } = body

    const verify = await axios.get(`https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`, {
        headers: {
            Authorization: `Bearer ${process.env.SECRET_KEY}`
        }
    })
    return verify.data
}

module.exports = verifyAccount