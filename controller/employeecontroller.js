var employeedb = require('../model/employeemodel');
var taskdb = require('../model/taskmodel');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.employee_login = async(req,res)=>{
    try {
        var data = await employeedb.find({email:req.body.email});
        console.log(data);
        if(data.length==1)
        {
            bcrypt.compare(req.body.password, data[0].password,function (err, result){
                if(result)
                {
                    var token = jwt.sign({id:data[0].id},'employee');
                    res.status(200).json({
                        status:"login successfully",
                        data,
                        token
                    })
                }
                else{
                    res.status(200).json({
                        status:"chack your email and password"
                    })
                }
            })
        }
        else{
            res.status(200).json({
                status:"not found"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"somthing went wrong"
        })
    }
}

exports.employee_task = async(req,res)=>{
    try {
        var id=req.id;
        console.log(id);
        var data = await taskdb.find({
            employee_id:id,
            process:"pending"
        });
         
        res.status(200).json({
            status:"employee task",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"not employee task"
        })
    }
}

exports.decline = async(req,res)=>{
    try {
        var id=req.params.id;
        var data = await taskdb.findByIdAndUpdate(id,{process:"decline"});

        res.status(200).json({
            status:"success",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"not decline"
        })
    }
}

exports.complete = async(req,res)=>{
    try {
        var id=req.params.id;
        var data = await taskdb.findByIdAndUpdate(id,{process:"complete"});

        res.status(200).json({
            status:"complete",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"not complete"
        })
    }
}