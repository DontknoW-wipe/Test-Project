const mongoose = require('mongoose');

const testcode = new mongoose.Schema({
	testcode : String
});

module.exports = mongoose.model("testcode", testcode);