const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const registeruserdata = new mongoose.Schema({
    TestID:String,
    Fullname:String,
    Email:String,
    Mobile:Number,
    Schoolname:String,
    Testduration:Number,
    Testdate:String,
    Testtime:String,
    TotalQuestion:Number,
    EmailVerified:Boolean,
    Password:String

});

module.exports = mongoose.model("registeruserdata", registeruserdata);