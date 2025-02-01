// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const { login, signup, sendotp, changePassword } = require("../controllers/Auth")
const { resetPasswordToken, resetPassword } = require("../controllers/resetPassword")
const { auth } = require("../middleware/auth")


// Authentication routes
router.post("/login", login) // Route for user login
router.post("/signup", signup) // Route for user signup
router.post("/sendotp", sendotp) // Route for sending OTP to the user's email
router.post("/changepassword", auth, changePassword) // Route for Changing the password

// Reset Password routes
router.post("/reset-password-token", resetPasswordToken) // Route for generating a reset password token
router.post("/reset-password", resetPassword) // Route for resetting user's password after verification


module.exports = router // Export the router for use in the main application
