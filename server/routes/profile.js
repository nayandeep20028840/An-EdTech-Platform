const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middleware/auth")
const { deleteAccount, updateProfile, getAllUserDetails, updateDisplayPicture, getEnrolledCourses, instructorDashboard } = require("../controllers/profile")

// Profile Routes
router.delete("/deleteProfile", auth, deleteAccount) // Delete Account
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
router.get("/getEnrolledCourses", auth, getEnrolledCourses) // Get Enrolled Courses
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)


module.exports = router