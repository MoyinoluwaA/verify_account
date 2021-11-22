const UserService = require('../services/user')

const checkUserExists = (type) => async(req, res, next) => {
    try {
        let isUser
        
        if (type === 'verify') {
            const {params: { email }} = req
            isUser = await UserService.getUser(email)
        } else {
            const { body: { email }} = req
            isUser = await UserService.getUser(email)
        }

        const [ user ] = isUser

        if (type === 'register') {
            if (user) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'User already exists. Log in',
                    data: []
                })
            }
    
            next()
        } else {
            if (type === 'login' && !user) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Invalid credentials',
                    data: []
                })
            }

            if (type === 'reset' && !user) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'User not found'
                })
            }
    
            req.user = user
            next()
        } 
    }
    catch (err) {
        next(err)
    }
}

module.exports = checkUserExists