
const mongoose = require("mongoose"); // Import the Mongoose library to interact with MongoDB

require("dotenv").config(); // Load environment variables from a `.env` file into `process.env`

const { MONGODB_URL } = process.env; // Destructure the MongoDB connection URL from environment variables

exports.connect = () => { // Export a function named 'connect' to establish a connection with MongoDB
	mongoose
		.connect(MONGODB_URL, {
			useNewUrlparser: true, // Parses MongoDB connection string correctly (legacy option).
			useUnifiedTopology: true, // Enables the new connection management engine for better performance.
		})
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
			console.log(`DB Connection Failed`); // Log a failure message for easier debugging
			console.log(err); // Log the actual error message for detailed information
			process.exit(1); // Exit the Node.js process with a failure code (1) to indicate an error
		});
};
