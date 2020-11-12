const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Answers = new mongoose.Schema({
    TestID:String,
    Answers:{type:Array}

});

module.exports = mongoose.model("answer", Answers);