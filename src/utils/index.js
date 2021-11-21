const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hashPassword = async password => {
    return await bcrypt.hash(password, 10)
}

const comparePassword = async(password, userPassword) => {
    return await bcrypt.compare(password, userPassword)
}

const generateToken = async(user, type) => {
    const token = jwt.sign(
        { id: user.id, email: user.email },
        type === 'access' ? process.env.TOKEN_KEY : process.env.RESET_TOKEN_KEY,
        {
        expiresIn: type === 'access' ? '4h' : '1h',
        }
    )
    return token
}

const validateToken = async (token, type) => {
    try {
        return jwt.verify(token, type === 'access' ? process.env.TOKEN_KEY : process.env.RESET_TOKEN_KEY)
    } catch (err) {
        return false
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    validateToken
}