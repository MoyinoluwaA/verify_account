const Joi = require('joi')

const accountSchema = {
    schema: Joi.object().keys({
        account_number: Joi.string().length(10).required(),
        bank_code: Joi.string().required(),
    }),
    message: 'Error verifying account'
}

module.exports = accountSchema