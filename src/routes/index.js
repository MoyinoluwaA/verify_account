const express = require('express')
const resolveAccount = require('../controller/account')
const { registerUser, loginUser, forgotPassword, resetPassword, verifyUser } = require('../controller/user')
const checkEmailVerified = require('../middleware/checkEmailVerified')
const checkUserExists = require('../middleware/checkUserExist')
const validateInput = require('../middleware/validation')
const verifyToken = require('../middleware/verifyToken')
const accountSchema = require('../models/account')
const { createUserSchema, loginUserSchema, forgotPasswordSchema, resetPasswordSchema } = require('../models/user')
const router = express.Router()

router.post(
    '/users/register',
    validateInput(createUserSchema, 'body'),
    checkUserExists('register'),
    registerUser
)

router.patch(
    '/users/verify/:email',
    checkUserExists('verify'),
    verifyUser
)

router.post(
    '/users/login',
    validateInput(loginUserSchema, 'body'),
    checkUserExists('login'),
    checkEmailVerified,
    loginUser
)

router.post(
    '/users/forgot-password',
    validateInput(forgotPasswordSchema, 'body'),
    checkUserExists('reset'),
    forgotPassword
)

router.post(
    '/users/reset-password',
    verifyToken('reset'),
    validateInput(resetPasswordSchema, 'body'),
    resetPassword
)

router.post(
    '/verify-account',
    verifyToken('access'),
    validateInput(accountSchema, 'body'),
    resolveAccount
)

module.exports = router