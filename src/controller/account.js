const verifyAccount = require("../services/verifyAccount")

const resolveAccount = async(req, res, next) => {
    try {
        const { body } = req
        const account = await verifyAccount(body)

        res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Account is verified',
            data: account.data
        })

    } catch (err) {
        if (err.response.status === 422) {
            return res.status(422).json({
                code: 422,
                status: 'failed',
                message: 'Account could not be verified',
                data: err.response.data
            })
        } else if (err.response.status === 400) {
            return res.status(400).json({
                code: 400,
                status: 'failed',
                message: 'Bank code is incorrect',
                data: err.response.data
            })
        }

        next(err)
    }
}

module.exports = resolveAccount