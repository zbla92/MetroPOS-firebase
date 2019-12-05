const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

admin.initializeApp({
    credential: admin.credential.cert(require('../keys/admin.json'))
})

const config = {
    apiKey: "AIzaSyC3JbrptNnwPPAGzNugOuZ0A2r82ZSPpnM",
    authDomain: "metropos-4c5ed.firebaseapp.com",
    databaseURL: "https://metropos-4c5ed.firebaseio.com",
    projectId: "metropos-4c5ed",
    storageBucket: "metropos-4c5ed.appspot.com",
    messagingSenderId: "754533303452",
    appId: "1:754533303452:web:4ce1b70f43a1141d531959",
    measurementId: "G-HRMYCH6CXY"
}

const firebase = require('firebase')
firebase.initializeApp(config)
const db = admin.firestore();



    
app.post('/post', (req, res) => {
    console.log(req.data);
    db.collection('posts')
        .add(req.body)
        .then(doc => {
            res.json({message: 'all is good'})
        })
        .catch(err => console.log(err))
})


//Create new employee
app.post('/createNewEmployee', (req, res) => {
    // Here goes logic for validation

    const newEmployee = {
        name: req.body.name,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        createdAt: new Date().toISOString(),
        userID: req.body.userID
    }
    console.log(newEmployee)

    db.collection('employees')
        .add(newEmployee)
        .then(doc => {
            res.json({message: `User id ${newEmployee.userID}, was created with document ID of ${doc.id} !`})
        })
       .catch(err => console.log(err))
})



exports.api = functions.https.onRequest(app)

