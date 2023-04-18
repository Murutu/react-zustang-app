import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN; 

/* Make API Reqeusts*/

/* Authenticate Function */
export async function authenticate(username) {
    try {
        return await axios.post("/api/authenticate")
    } catch (error) {
        return { error: "Username doesn't exist...!"}
    }
}

/* Get User Details */
export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error: "Password doesn't Match...!"}
    }
}

/* Register User Function */
export async function registerUser(credentials) {
    try {
        const { data : { msg }, status } = await axios.post(`/auth/user-register/`, credentials);

        let { username, email } = credentials;

        /* send email */
        if(status === 200) {
            await axios.post("/auth/user-register-verification/", { username, userEmail : email, text : msg})
        }

        return Promise.resolve(msg)

    } catch (error) {
        return Promise.reject({ error })
    }
}

/* Login Function */
export async function verifyPassword({ username, password }) {
    try {
        if (username) {
            const { data } = await axios.post("/auth/user-login/", {username, password})
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error: "Password doesn't Match...!"})
    }
}

/* generate OTP */
export async function generateOTP(username) {
    try {
        const {data: { code }, status} = await axios.get("/auth/forgot-password/", { params: { username }});

        // send mail with OTP
        if(status === 200) {
            let { data: { email }} =  await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post("/api/registerMail", { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error })
    }
}

/* verify OTP */
export async function verifyOTP({ username, code}) {
    try {
        const { data, status } = await axios.get("/auth/verify-change-password/", {params: { username, code }})
        return { data, status }
    } catch (error) {
        return Promise.reject(error)
    }
}

/* reset password */

export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await axios.put("/auth/new-password/", { username, password});
        return Promise.resolve({ data, status })
    } catch (error) {
        return Promise.reject({ error })
    }
}


/*
import axios from "axios"

export async function authenticate(username) {
    try {
        return await axios.post("/api/authenticate")
    }catch(error) {
        return {error: "Username doesn't exist"}
    }
}
*/
