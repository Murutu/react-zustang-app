import toast from "react-hot-toast";


/*
Validate login page username 
*/
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

    return errors;
}

/*
Validate password 
*/
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values)

    return errors;
}

/*
Validate reset password
*/

export async function resetPasswordValidation(values) {
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd) {
        errors.exist = toast.error("Password not match...!")
    }

    return errors;
}

/*
Validate register
*/
export async function registerValidation(values) {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values)
}

/*
Verify password 
*/

function passwordVerify(errors ={}, values) {

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password) {
        errors.password = toast.error("Password Required...!")
    } else if(values.password.includes(" ")) {
        errors.password = toast.error("Wrong Password...!")
    } else if(values.password.length < 4) {
        errors.password = toast.error("Password must be more than 6 characters!")
    } else if(!specialChars.test(values.password)) {
        errors.password = toast.error("Password must have special character")
    }   
}

/*
Validate profile
*/

export async function profileValidation(values) {
    const errors = emailVerify({}, values);
    return errors;
}

/*
Validate Username 
*/

function usernameVerify(error = {}, values) {
    if(!values.username){
        error.username = toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!')
    }

    return error;
}

/*
Validate email 
*/

function emailVerify(error = {}, values) {
    if(!values.email) {
        error.email = toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}