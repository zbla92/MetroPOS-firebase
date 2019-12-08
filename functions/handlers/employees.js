const { db, admin } = require('../util/admin');

const { validateNewEmployee } = require('../util/validators') 

// Create new employee
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

    db.doc(`/employees/${newEmployee.userID}`)
    .get()
    .then(doc => {
        if(doc.exists){
            return res.status(400).json({ userID: `This user ID is already taken` })
        } else {
            db.collection('employees').doc(newEmployee.userID)
            .set(newEmployee)
            .then(doc => {
                res.json({message: `Employee with ID: ${newEmployee.userID}, was created with document ID of ${doc.id} !`})
            })
           .catch(err => console.log(err))
        }
    })
}


// Get Employee
exports.employeeLogIn = (req, res) => {
    console.log(req.params.userID)
    let userData = {};
    db.doc(`/employees/${req.params.userID}`)
        .get()
        .then(doc => {
            if(!doc.exists){
                return res.status(404).json({error: 'User not found!'})
            }
            userData = doc.data();
            return res.json(userData)
        })
        .catch(err => console.log(err))
}

// Delete User 
exports.deleteEmployee = (req, res) => {
    const document = db.doc(`/employees/${req.params.userID}`);
    document.get()
        .then(doc => {
            if(!doc.exists){
                return res.status(400).json({ error: "Employee not found" });
            } else {
                return document.delete()
            }
        })
        .then(() => {
            res.json({ message: `Deleted user ${req.params.userID} sucessfully!`})
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ error: err.code})
        })
}