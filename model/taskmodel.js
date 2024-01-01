const mongoose = require('mongoose');

const task = new mongoose.Schema({
    employee_id:{type:String},
    task:{type:String},
    process:{type:String,default:"pending"}
})

module.exports = mongoose.model('task',task)