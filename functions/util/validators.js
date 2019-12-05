const isEmail = email => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(emailRegEx)) return true;
    else return false;
}

const isEmpty = (string) => {
    if(string.trim() === '') return true;
    else return false;
}


exports.validateNewEmployee = data => {
    let errors = {};

    if(isEmpty(data.name)){
        errors.name = 'Name must not be empty!';
    }
    if(isEmpty(data.lastName)){
        errors.lastName = 'Lastname must not be empty!';
    }
    if(isEmpty(data.jobCode)){
        errors.jobCode = 'Please select a jobcode!';
    }
    if(isEmpty(data.dateOfBirth)){
        errors.dateOfBirth = 'Please select date of birth!';
    } 
    if(isEmpty(data.userID)){
        errors.userID = 'Please input user ID!';
    }
    if(isEmpty(data.address)){
        errors.address = 'Address must not be empty!';
    }
    if(isEmpty(data.email)){
        errors.email = 'Must not be empty'
    } else if(!isEmail(data.email)){
        errors.email = 'Must be a valid email address'
    }

    return{
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}