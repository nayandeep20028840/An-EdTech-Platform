
const express = require("express")
const router = express.Router()
const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")


// Payment routes
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment", auth, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail)
// router.post("/verifySignature", verifySignature)

module.exports = router
