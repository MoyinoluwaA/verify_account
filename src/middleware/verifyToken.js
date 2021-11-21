const { validateToken } = require("../utils")
const UserService = require('../services/user')

const verifyToken = type => async(req, res, next) => {
    try {
        let token;
        type === 'access' 
        ? 
            token = req.headers['x-access-token']
        :
            token = req.query.token
    
        if (!token)
            return res.status(403).json({
                status: 'fail',
                message: 'No token provided.'
            })
        
        const tokenValidated = await validateToken(token, type)
        
        if (!tokenValidated) 
            return res.status(403).json({
                status: 'fail',
                message: 'Failed to authenticate token.'
            })
        
        const { email, user_id } = tokenValidated
        const [authorizedUser] = await UserService.getUser(email)

        if (!authorizedUser) 
            return res.status(403).json({
                status: 'fail',
                message: 'Invalid credentials'
            })
        
        req.id = user_id
        next()
    }
    catch (err) {
        next(err)
    }
}

module.exports = verifyToken