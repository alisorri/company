
var Employee = require('../models/Employee');
var Manager = require('../models/Manager');
const db = require("../db");
function validateFields (reqFields){
    let params ={};
   let fields= [{name:"firstName",required:true},{name:"lastName",required:true},{name:"userAddedOrder",required:true},{name:"age",required:false}];
   fields.forEach((field)=>{
      if(reqFields[field.name] ==undefined){
          if(field.required){
              throw `${field.name} is required field`;
          }
      }else{
        params[field.name] =reqFields[field.name]
      } 
   });
   return params;
}

exports.get = async (req,res)=>{
    let employees =  await Employee.employees();
    
    res.send(employees ); 
}
exports.getManagers = async (req,res)=>{
    let managers =  await Manager.managers();
    res.send(managers ); 
}
exports.create = async(req,res)=>{
    try{
        let params =validateFields(req.body);
        params.userId =req.userId;
        let employee =  await Employee.create(params);
         res.send(employee);
    }catch(exception){
        res.status(401).send({err:exception});
    }

}
exports.assignToManager = async(req,res)=>{
    try{
        let resultManagerPro = db.query("select * from employees where id =? and isManager =1",req.params.managerId);
        let resultEmployeePro = db.query("select * from employees where id =? and isManager =0",req.params.id);
        let resultManager;
        let resultEmployee;
        [resultManager,resultEmployee]= await Promise.all([resultManagerPro,resultEmployeePro]);
        if(resultManager.length >0 && resultEmployee.length>0){
            let a = {id:req.params.id,managerId:req.params.managerId};
            await Employee.update({managerId:req.params.managerId,departmentId:resultManager[0].departmentId},{id:req.params.id});
            res.send({status:true});
        }else{
            if(resultManager.length ==0 ){
                res.status(404).send({err:`There is no department like ${req.params.managerId}`});
            }
            if(resultEmployee.length ==0){
                res.status(404).send({err:`There is no department like  ${req.params.id} `});
            }
            
        }
       
    }catch(exception){
        console.log("exception is ",exception)
        res.status(500).send({err:exception});
    }

}
exports.createManager =async (req,res)=>{
    try{
        let params =validateFields(req.body);
        params.userId =req.userId;
        let manager =  await Manager.create(params);
         res.send(manager);
    }catch(exception){
        res.status(500).send({err:exception});
    }
}
exports.assignToDepartment =async (req,res)=>{
    try{
        let resultManagerPro = db.query("select * from employees where id =? and isManager =1",req.params.id);
        let resultDepartmentPro = db.query("select * from departments where id =?",req.params.departmentId);
        let resultManager,resultDepartment;
        [resultManager,resultDepartment]= await Promise.all([resultManagerPro,resultDepartmentPro]);
        if(resultManager.length >0 && resultDepartment.length>0){
            await db.query("update employees set departmentId=? where id=? or managerId =?",
            [req.params.departmentId,req.params.id,req.params.id]);
            res.send({
                status:true
            });
        }else{
            if(resultManager.length ==0){
                res.status(401).send({err:`There is no manager like this`});
            }
            if(resultDepartment.length ==0){
                res.status(401).send({err:`There is no department like this`});
            }
            
        }

    }catch(exception){
        res.status(500).send({err:exception});
    }
}