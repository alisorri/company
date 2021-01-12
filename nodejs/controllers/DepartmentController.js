var Employee = require('../models/Employee');
var Department = require('../models/Department');
var db = require("../db");
exports.create = async(req,res)=>{
    try{
        let department =  await Department.create(req.body);
         res.send(department);
    }catch(exception){
        res.status(500).send({err:exception});
    }

}
exports.biggest = async(req,res)=>{
    try{
       let result = await db.query("select departmentId,count(*) count, name from employees t1 join departments t2  on t1.departmentId =t2.id  where departmentId is not null group by departmentId order by count desc limit 1");
       if(result.length ==1){
           res.send(result[0]);
       }
    }catch(exception){
        res.status(500).send({err:exception});
    }

}
exports.get =async(req,res)=>{
    try{
        let result = await db.query("select * from departments ");
            res.send(result[0]);
     }catch(exception){
         res.status(500).send({err:exception});
     }
}