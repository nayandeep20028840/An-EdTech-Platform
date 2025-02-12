
const jwt = require("jsonwebtoken"); // For generating and verifying JSON Web Tokens (JWTs)
const dotenv = require("dotenv"); // For loading environment variables from .env file
const User = require("../models/User"); // Importing the User model to interact with the user database

dotenv.config(); // Configuring dotenv to load environment variables from .env file

exports.auth = async (req, res, next) => { // This function is used as middleware to authenticate user requests
	try {
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", ""); // Extracting JWT from request cookies, body or headers

		if (!token) { // If JWT is missing, return 401 Unauthorized response
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			const decode = await jwt.verify(token, process.env.JWT_SECRET); // Verifying the JWT using the secret key stored in environment variables
			console.log(decode);
			req.user = decode; // Storing the decoded JWT payload in the request object for further use
		} catch (error) {
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" }); // If JWT verification fails, return 401 Unauthorized response
		}

		next(); // If JWT is valid, move on to the next middleware or request handler
	} catch (error) {
		return res.status(401).json({ // If there is an error during the authentication process, return 401 Unauthorized response
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};

exports.isStudent = async (req, res, next) => { // Middleware function to verify if the user is a student
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Student") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};

exports.isAdmin = async (req, res, next) => { // Middleware function to verify if the user is an admin
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};

exports.isInstructor = async (req, res, next) => { // Middleware function to verify if the user is an instructor
	try {
		const userDetails = await User.findOne({ email: req.user.email }); // Fetching user details from the database based on the decoded token email
    
		console.log(userDetails);
		console.log(userDetails.accountType);

		if (userDetails.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
		next(); // If the user is an instructor, proceed to the next middleware or request handler
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
