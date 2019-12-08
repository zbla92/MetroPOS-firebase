const functions = require('firebase-functions');
const app = require('express')();

const { db } = require('./util/admin')
const config = require('./util/config')

const { createNewEmployee, employeeLogIn, deleteEmployee } = require('./handlers/employees')


// Employee routes
app.post('/newEmployee', createNewEmployee);
app.get('/logIn/:userID', employeeLogIn );
app.delete('/employee/:userID', deleteEmployee);


exports.api = functions.region('europe-west2').https.onRequest(app)

