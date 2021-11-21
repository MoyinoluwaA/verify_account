const { sendEmail } = require("../services/email")
const { createUser, validatePassword, updatePassword, updateVerifiedUser } = require("../services/user")
const { generateToken } = require("../utils")

const registerUser = async(req, res, next) => {
    try {
        const { body } = req
        const newUser  = await createUser(body)
        const { password, ...user } = newUser

        res.status(201).json({
            code: 201,
            status: 'success',
            message: 'User added successfully',
            data: user
        })
    }
    catch (err) {
        next(err)
    }
}

const verifyUser = async(req, res, next) => {
    try {
        const { user } = req
        const verified = await updateVerifiedUser(user)
        const { password, ...verifiedUser } = verified

        res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Email account has been verified. Log in',
            data: verifiedUser
        })
    }
    catch (err) {
        next(err)
    }
}

const loginUser = async(req, res, next) => {
    try {
        const { user, body: { password }} = req
       
        const { token } = await validatePassword(user, password)

        if (!token) {
            res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials',
                data: 'Error logging in user'
            })
        } else {
            res.status(200).json({
                code: 200,
                status: 'success',
                message: 'User logged in successfully',
                data:  { role: user.role, token }
            })
        }
    }
    catch (err) {
        next(err)
    }
}

const forgotPassword = async(req, res, next) => {
    try {
        const { user } = req
        const token = await generateToken(user, 'reset')
        await sendEmail(body, 'reset')

        res.status(200).json({
            status: 'success',
            message: 'token generated to reset password',
            data: { token }
        })
    }
    catch (err) {
        next(err)
    }
}

const resetPassword = async(req, res, next) => {
    try {
        const { body, id } = req
        const user = await updatePassword(body.password, id)
        const { password, ...updatedUser } = user

        res.status(200).json({
            status: 'success',
            message: 'password reset successfully',
            data: updatedUser
        })
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    registerUser,
    verifyUser,
    loginUser,
    forgotPassword,
    resetPassword
}