var db = require("../db");
module.exports = class Employee {
  constructor(data) {
    if (data) {
        console.log(data);
      Object.assign(this, data);
    }
  }
  save() {
      let result =null;
      try{
        result = await =db.query("update employees set ?",data);
        return this;
      }catch (exception){

      }
      
  }
  static async update(data,where){
      try{
        let result =await db.query("update employees set ? where ?; ",[data,where]);
        return result;
      }catch(exception){
          console.log(exception);
          throw exception;
      }
    
  }
  static  async create(data) {
    try {
      let employeeObj =  await db.query("insert into employees set ?;", data);
      let newEmploeey =  await db.query("select * from employees where ?",{id:employeeObj.insertId});
      console.log(newEmploeey);
      return new Employee(newEmploeey[0]);
    } catch (exception) {
        throw exception;
      console.log(exception);
    }

    console.log(employee);
    return employee;
  }

  static async  employees() {
    
    try {
        let result;
      result =  await db.query("select * from employees;");
      console.log(result);
      return result;
    } catch (exception) {
      console.log(exception);
      throw exception;
    }

  }
};
