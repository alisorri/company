var db = require("../db");
module.exports = class Department {
  constructor(data) {
    if (data) {
        console.log(data);
      Object.assign(this, data);
    }
  }
  save() {
      let result =null;
      try{
        result = await =db.query("update departments where id=? set ?",data);
        return this;
      }catch (exception){
        throw exception;
      }
      
  }
  static  async create(data) {
    let department = null;
    try {
      let departmentObj =  await db.query("insert into departments set ?;", data);
      let newDepartment =  await db.query("select * from departments where ?",{id:departmentObj.insertId});
      return new Department(newDepartment[0]);
    } catch (exception) {
      console.log(exception);
    }
  }
  static async update(where,data){

  }


  static async  departments() {
    let result;
    try {
      result =  await db.query("select * from departments;");
      return result;
    } catch (exception) {
      throw exception;
    }
    
  }
};
