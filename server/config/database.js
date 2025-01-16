// Import the Mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Load environment variables from a `.env` file into `process.env`
require("dotenv").config();

// Destructure the MongoDB connection URL from environment variables
const { MONGODB_URL } = process.env;

// Export a function named 'connect' to establish a connection with MongoDB
exports.connect = () => {
	mongoose
		.connect(MONGODB_URL, {
			useNewUrlparser: true, // Parses MongoDB connection string correctly (legacy option).
			useUnifiedTopology: true, // Enables the new connection management engine for better performance.
		})
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
      // Log a failure message for easier debugging
			console.log(`DB Connection Failed`);
      // Log the actual error message for detailed information
			console.log(err);
      // Exit the Node.js process with a failure code (1) to indicate an error
			process.exit(1);
		});
};
