const db = require("../db")
const queries = require("../db/queries")
const { hashPassword, comparePassword, generateToken } = require("../utils")
const { sendEmail } = require("./email")

const UserService = () => {

    const createUser = async body => {
        const { first_name, last_name, email, password } = body
        const encryptedPassword = await hashPassword(password)

        const payload = [first_name, last_name, email, encryptedPassword]
        await sendEmail(body, first_name, 'verify')
        return db.one(queries.addUser, payload)
    }

    const getUser = email => db.any(queries.getUser, email)

    const updateVerifiedUser = user => db.one(queries.verifyUser, [user.user_id])

    const validatePassword = async(user, password) => {
        const isValid = await comparePassword(password, user.password)
    
        if (isValid) {
            const token = await generateToken(user, 'access')
            return { token }
        }
        return false
    }

    const updatePassword = async(password, id) => {
        const encryptedPassword = await hashPassword(password)
        return db.one(queries.updatePassword, [encryptedPassword, id])
    }


    return {
        createUser,
        getUser,
        validatePassword,
        updatePassword,
        updateVerifiedUser
    }
}

module.exports = UserService()