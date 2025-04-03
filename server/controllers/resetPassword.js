const User = require("../models/User")
const mailSender = require("../utils/mailSender") // Import the mailSender utility to send emails
const bcrypt = require("bcrypt") // Import the bcrypt library to handle password encryption
const crypto = require("crypto") // Import the crypto module to generate random tokens


exports.resetPasswordToken = async (req, res) => { // Export a function to handle generating a password reset token
    try {

        const email = req.body.email // Extract email from the request body
        const user = await User.findOne({ email: email }) // Find the user in the database by their email
        if (!user) {
            return res.json({
                success: false,
                message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
            })
        }

        const token = crypto.randomBytes(20).toString("hex") // Generate a random token for password reset

        const updatedDetails = await User.findOneAndUpdate( // Update the user record with the token and expiration time (1 hour)
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 3600000,
            },
            { new: true }
        );


        console.log("DETAILS", updatedDetails)

        // Construct the password reset URL with the generated token

        const url = `http://localhost:3000/update-password/${token}` // For Localhost
        // const url = `https://studynotion-edtech-project.vercel.app/update-password/${token}` // for deployment

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

        const encryptedPassword = await bcrypt.hash(password, 10)


        await User.findOneAndUpdate( // Update the user's password and remove the token
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
