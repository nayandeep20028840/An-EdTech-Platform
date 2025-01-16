// Import the User model to interact with the database for user-related operations
const User = require("../models/User")

// Import the mailSender utility to send emails
const mailSender = require("../utils/mailSender")

// Import the bcrypt library to handle password encryption
const bcrypt = require("bcrypt")

// Import the crypto module to generate random tokens
const crypto = require("crypto")

// Export a function to handle generating a password reset token
exports.resetPasswordToken = async (req, res) => {
  try {
    // Extract email from the request body
    const email = req.body.email
    // Find the user in the database by their email
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      })
    }
    // Generate a random token for password reset
    const token = crypto.randomBytes(20).toString("hex")
    
    // Update the user record with the token and expiration time (1 hour)
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );
    
    // Log updated user details (for debugging purposes)
    console.log("DETAILS", updatedDetails)

    // const url = `http://localhost:3000/update-password/${token}`
    // Construct the password reset URL with the generated token
    const url = `https://studynotion-edtech-project.vercel.app/update-password/${token}`

    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    )

    res.json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    })
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    })
  }
}

// Export a function to handle resetting the password
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      })
    }
    const userDetails = await User.findOne({ token: token })
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      })
    }
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      })
    }
    // Encrypt the new password using bcrypt
    const encryptedPassword = await bcrypt.hash(password, 10)
    // Update the user's password and remove the token
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    )
    res.json({
      success: true,
      message: `Password Reset Successful`,
    })
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    })
  }
}
