// Import the Razorpay module to integrate Razorpay's payment gateway into your application
const Razorpay = require("razorpay");

// Export an instance of Razorpay to be used for creating and managing payments
exports.instance = new Razorpay({
  // The key ID provided by Razorpay to authenticate your application
	key_id: process.env.RAZORPAY_KEY,
  // The key secret provided by Razorpay for secure communication
	key_secret: process.env.RAZORPAY_SECRET,
});
