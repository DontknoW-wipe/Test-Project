const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Questions = new mongoose.Schema({
    TestID:String,
    Question:{type:Array}

});

module.exports = mongoose.model("question", Questions);