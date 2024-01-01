var jwt = require('jsonwebtoken');

exports.admin =(req,res,next)=>{
    jwt.verify(req.get('authorization'),'admin',next())
}

exports.employee =(req,res,next)=>{
    jwt.verify(req.get('authorization'),'employee',function(error,data){
      if(error)
      {
        console.log(error);
        res.status(500).json({
            status:"invalid token"
        })
      }
      else{
        req.id = data.id 
        next() 
      }
    })
}