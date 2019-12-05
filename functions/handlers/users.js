const { db, admin } = require('../util/admin');

const { validateNewEmployee } = require('../util/validators') 


exports.createNewEmployee = (req, res) => {
    const newEmployee = {
        name: req.body.name,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        createdAt: new Date().toISOString(),
        userID: req.body.userID,
        jobCode: req.body.jobCode,
        address: req.body.address,
        email: req.body.email
    }

    const { valid, errors } = validateNewEmployee(newEmployee);
    if(!valid) return res.status(400).json(errors);
       // Here goes logic for validation
    console.log(newEmployee)

    db.collection('employees')
        .add(newEmployee)
        .then(doc => {
            res.json({message: `User id ${newEmployee.userID}, was created with document ID of ${doc.id} !`})
        })
       .catch(err => console.log(err))
}