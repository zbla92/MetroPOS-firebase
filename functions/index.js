const functions = require('firebase-functions');
const app = require('express')();

const { db } = require('./util/admin')
const config = require('./util/config')

const { createNewEmployee, employeeLogIn } = require('./handlers/users')

// const config = 

// const firebase = require('firebase')
// firebase.initializeApp(config)


// Employee routes
app.post('/newEmployee', createNewEmployee);
app.get('/logIn', employeeLogIn );
    



// This is not in use
app.post('/post', (req, res) => {
    console.log(req.data);
    db.collection('posts')
        .add(req.body)
        .then(doc => {
            res.json({message: 'all is good'})
        })
        .catch(err => console.log(err))
})
// Unti here 


exports.api = functions.https.onRequest(app)

