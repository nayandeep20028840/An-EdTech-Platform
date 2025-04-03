
const cloudinary = require("cloudinary").v2; // Import the Cloudinary library and access its version 2 API

exports.cloudinaryConnect = () => { // Export a function named 'cloudinaryConnect' to configure Cloudinary
	try {
		cloudinary.config({ // Configure Cloudinary with credentials to enable media uploads
    
			cloud_name: process.env.CLOUD_NAME, // Cloudinary's cloud name (unique identifier for your Cloudinary account)
			api_key: process.env.API_KEY, // API key for authentication (provided by Cloudinary for your account)
			api_secret: process.env.API_SECRET, // API secret for secure access to your Cloudinary account
		});
	} catch (error) {
		console.log(error); // Log any error that occurs during the configuration process
	}
};
