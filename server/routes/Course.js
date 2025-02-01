
const express = require("express")
const router = express.Router()



// Course Controllers Import
const { createCourse, getAllCourses, getCourseDetails, getFullCourseDetails, editCourse, getInstructorCourses, deleteCourse } = require("../controllers/Course")

// Tags Controllers Import
const { showAllCategories, createCategory, categoryPageDetails } = require("../controllers/Category")
const { createSection, updateSection, deleteSection } = require("../controllers/Section")
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/Subsection")
const { createRating, getAverageRating, getAllRatingReview } = require("../controllers/RatingandReview")
const { updateCourseProgress, getProgressPercentage } = require("../controllers/courseProgress")
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")


// Course routes - Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
router.post("/editCourse", auth, isInstructor, editCourse)
router.post("/addSection", auth, isInstructor, createSection)
router.post("/updateSection", auth, isInstructor, updateSection)
router.post("/deleteSection", auth, isInstructor, deleteSection)
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
router.post("/addSubSection", auth, isInstructor, createSubSection)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.get("/getAllCourses", getAllCourses)
router.post("/getCourseDetails", getCourseDetails)
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)
// router.post("/getProgressPercentage", auth, isStudent, getProgressPercentage)
router.delete("/deleteCourse", deleteCourse)


// Category routes (Only by Admin) - Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory) // TODO: Put IsAdmin Middleware here
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)


// Rating and Review routes
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRatingReview)

module.exports = router
