const mongoose =require('mongoose');

const admin = new mongoose.Schema({
    name:{type:String, },
    email:{type:String,required:true, unique: true},
    password:{type:String,required:true}
})


module.exports = mongoose.model('admin',admin);