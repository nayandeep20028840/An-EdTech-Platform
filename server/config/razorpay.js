
const Razorpay = require("razorpay"); // Import the Razorpay module to integrate Razorpay's payment gateway into your application

exports.instance = new Razorpay({ // Export an instance of Razorpay to be used for creating and managing payments
	key_id: process.env.RAZORPAY_KEY, // The key ID provided by Razorpay to authenticate your application
	key_secret: process.env.RAZORPAY_SECRET, // The key secret provided by Razorpay for secure communication
});
