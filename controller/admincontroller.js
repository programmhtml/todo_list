var admindb = require('../model/adminmodel');
var taskdb = require('../model/taskmodel');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var employeedb = require('../model/employeemodel');


exports.admin_register= async(req,res)=>{
     try{
        bcrypt.hash(req.body.password, 10,async function (error,   hash){
            if(!error)
            {
                console.log(req.body);
                req.body.password=hash;
                var data= await admindb.create(req.body);
    
                res.status(200).json({
                    status:"register successfully",
                    data
                })
            }
            else{
                res.status(500).json({
                    status:"error"
    
                })
            }
         })
     }catch(error){
        console.log(error);
        res.status(500).json({
            status:"error"

        })
     }
  
}

exports.admin_login = async(req,res)=>{
try{
    var data = await admindb.find({email:req.body.email});
    if(data.length==1)
    {
        bcrypt.compare(req.body.password, data[0].password,function (err, result)
        {
            if(result)
            {
                var token = jwt.sign({ id:data[0].id },'admin');
                res.status(200).json({
                    status:"login successfully",
                    data,
                    token
                })
            }
            else
            {
                res.status(200).json({
                    status:"check your email and password",
                    data
                })
            }
        })
     
    } 
    else{
        res.status(500).json({
            status:"not found"
        })
    }

}catch(error){
    console.log(error);
    res.status(500).json({
        status:"somthing went wrong"
    })
}
    
}

exports.employee_register= async(req,res)=>{
    try {
        bcrypt.hash(req.body.password, 10,async function (error,   hash){
            if(!error)
            {
                console.log(req.file)
                req.body.photo = req.file.filename;
                req.body.starting_date = new Date();
                req.body.password = hash;
                var data = await employeedb.create(req.body);

                res.status(200).json({
                    status:"employee register",
                    data
                })
            }
        })
    } catch (error) {
        console.log(error);
        req.status(500).json({
            status:"resister somthing and wrong"
        })
    }
   
}

exports.employee_views = async(req,res)=>{
    try {
        var data = await employeesdb.find();

        res.status(200).json({
            status:"employee views",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"not view"
        })
    }
}

exports.employee_single = async(req,res)=>{
    try {
        var id= req.params.id;
        var data = await employeesdb.findById(id).select("name email contact address date_of_birth");

        res.status(200).json({
            status:"view employee",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"view employee"
        })
    }
}

exports.task_single = async(req,res)=>{
    try {
        var id = req.params.id;
        var data = await taskdb.findById(id);

        res.status(200).json({
            status:"task view",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"not view task"
        })
    }
}

exports.delete = async(req, res)=>{
    try {
        var id= req.params.id;
        var data = await employeesdb.findByIdAndDelete(id);

        res.status(200).json({
            status:"employee delete",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"not delete"
        })
    }
}

exports.update = async(req, res)=>{
    try {
        var id = req.params.id;
        var data = await employeesdb.findByIdAndUpdate(id,req.body);

        res.status(200).json({
            status:"employee update",
            data
        })
    } catch (error) {
        console.log(error);
     res.status(500).json({
        status:"not update"
     })   
    }
}

exports.add_task = async(req,res)=>{
    try {
        var data = await taskdb.create(req.body);

        res.status(200).json({
            status:"add task",
            data
        })

    } catch (error) {
        console.log(error);
        res.status(200).json({
            status:"not add task"
        })
    }
}


exports.task_delete =async(req,res)=>{
    try {
        var id = req.params.id;
        var data = await taskdb.findByIdAndDelete(id);

        res.status(200).json({
            status:"task delete",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"not delete"
        })
    }
}

exports.task_update = async(req,res)=>{
    try {
        var id = req.params.id;
        var data = await taskdb.findByIdAndUpdate(id,req.body);

        res.status(200).json({
            status:"task updete",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"not update"
        })
    }
}