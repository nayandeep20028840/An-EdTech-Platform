const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({ // Define the Tags schema
	name: {
		type: String,
		required: true,
	},
	description: { 
		type: String 
	},
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
});

module.exports = mongoose.model("Category", categorySchema); // Export the Tags model
