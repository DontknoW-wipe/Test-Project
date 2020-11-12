const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const submitAnswers = new mongoose.Schema({
    TestID:String,
    StudentSESSIONCODE:String,
    Answers:{type:Array}

});

module.exports = mongoose.model("submitanswer", submitAnswers);