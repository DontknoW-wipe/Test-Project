const mongoose = require('mongoose');

const user_copy = new mongoose.Schema({
	user_id:String,
	user_text_data:String
});

module.exports = mongoose.model("user_copy", user_copy);