const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const teststudentdata = new mongoose.Schema({
        Name:String,
        Mobile:String,
        Email:String,
        Gender:String,
        Dob:String,
        Collegename:String,
        Collegeroll:String,
        City:String,
        Pincode:String,
        State:String,
        SESSION_CODE:String

});

module.exports = mongoose.model("teststudentdata", teststudentdata);