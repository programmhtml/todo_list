const mongoose = require('mongoose');

const employee = new mongoose.Schema({
    name:{type:String},
    email:{type:String,required:true, unique: true},
    photo:{type:String},
    password:{type:String},
    contact:{type:Number},
    date_of_birth:{type:String},
    address:{type:String},
    starting_date:{type:Date},
})

module.exports =  mongoose.model('employee',employee)