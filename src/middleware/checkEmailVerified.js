const checkEmailVerified = (req, res, next) => {
    try {
        const { user: {is_verified}} = req

        if (is_verified === 'false')
            return res.status(401).json({
                code: 401,
                status: 'failed',
                message: 'Verify your email account',
                error: 'Failure while logging in'
            })

        next()
    }
    catch (err) {
        next(err)
    }
}

module.exports = checkEmailVerified