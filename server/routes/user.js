// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const { login, signup, sendotp, changePassword } = require("../controllers/Auth")
const { resetPasswordToken, resetPassword } = require("../controllers/resetPassword")
const { auth } = require("../middleware/auth")


// Authentication routes
router.post("/login", login)
router.post("/signup", signup)
router.post("/sendotp", sendotp)
router.post("/changepassword", auth, changePassword) 

// Reset Password routes
router.post("/reset-password-token", resetPasswordToken) // Route for sending reset password token to user's email
router.post("/reset-password", resetPassword) 


module.exports = router // Export the router for use in the main application
