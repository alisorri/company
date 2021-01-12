const express = require('express');
const db = require('./db');
const emploeeyController = require('./controllers/EmploeeyController');
const departmentController = require('./controllers/DepartmentController');
const userController = require ('./controllers/UsersController');

var app = new express();
app.use(express.urlencoded());
app.use(express.json());
app.get('/employees/',userController.verifyToken,emploeeyController.get);
app.get('/managers/',userController.verifyToken,emploeeyController.getManagers);
app.post('/employees',userController.verifyToken,emploeeyController.create); 
app.post('/managers/',userController.verifyToken,emploeeyController.createManager); 
app.put('/employees/:id/assignToManager/:managerId/',userController.verifyToken,emploeeyController.assignToManager);
app.put('/managers/:id/assignToDepartment/:departmentId',userController.verifyToken,emploeeyController.assignToDepartment);
app.get('/departments/',userController.verifyToken,departmentController.get);
app.post('/departments/',userController.verifyToken,departmentController.create);
app.get('/departments/mostEmployees/',userController.verifyToken,departmentController.biggest);
app.post("/login",userController.login);
app.listen('3000', ()=>{

    db.connect();
 console.log(`connected to port 3000`);
 
});

