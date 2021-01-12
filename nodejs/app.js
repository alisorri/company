const express = require('express');
const db = require('./db');
let db_pool = new db.DbConnection();

var app = new express();
app.get('/',(req,res)=>{
    console.log(db_pool);
    let employees = db_pool.get().query("select * from employees;",(err,results,fields)=>{
        if(err){
            res.status(500).json({
                error : "connection to database failed"
            });
        }else{
            return res.json(results);
        }
    })
});
app.listen('3000', ()=>{

    db_pool.connect();
 console.log(`connected to port 3000`);
 
});