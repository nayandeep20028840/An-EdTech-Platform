// Import the Cloudinary library and access its version 2 API
const cloudinary = require("cloudinary").v2; //! Cloudinary is being required

// Export a function named 'cloudinaryConnect' to configure Cloudinary
exports.cloudinaryConnect = () => {
	try {
    // Configure Cloudinary with credentials to enable media uploads
		cloudinary.config({
			// ########   Configuring the Cloudinary to Upload MEDIA ########
      
      // Cloudinary's cloud name (unique identifier for your Cloudinary account)
			cloud_name: process.env.CLOUD_NAME,
      // API key for authentication (provided by Cloudinary for your account)
			api_key: process.env.API_KEY,
      // API secret for secure access to your Cloudinary account
			api_secret: process.env.API_SECRET,
		});
	} catch (error) {
    // Log any error that occurs during the configuration process
		console.log(error);
	}
};
