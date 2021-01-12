const Employee =require('./Employee');
const db = require('../db');

module.exports =class Manager extends Employee{
    constructor(data){
        super(data);
    }
    static async managers(){
        try{
            let managers = await db.query("select * from employees where isManager =1;");
            return managers;
        }catch(exception){
            throw exception;
        }
        

    }
    static async create(data){
        try{
            data.isManager =1;
            let managerObj =await db.query("insert into employees set ?;", data);
            let newManager = await db.query("select * from employees where ?",{id:managerObj.insertId});
            return new Manager(newManager);
        }catch(exception){
            console.log(exception);
            throw exception;
        }
    }
}