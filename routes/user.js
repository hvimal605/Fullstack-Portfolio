const express = require("express")
const { register, login, logout, user, updateuser, updatePassword, getUserForPortfolio, resetPasswordToken, resetPassword } = require("../controller/user")
const { isauth } = require("../middlewares/auth")

const router = express.Router()

router.post('/register',register) 
router.post('/login',login)
router.get('/logout',isauth,logout)
router.get('/me',isauth,user)
router.put('/update/me',isauth,updateuser)
router.put('/update/password',isauth,updatePassword)
router.get('/me/portfolio',getUserForPortfolio)
router.post('/forgotPasswordtoken', resetPasswordToken)
router.put('/resetPassword/:token', resetPassword)
module.exports = router