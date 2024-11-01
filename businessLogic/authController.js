// import database module to access user data 
const db = require('../dataAccess/database');

// asynchronous function to handle user login
async function login(username, password) {

    // retrieve list of users from database
    const users = await db.getUsers();

    // iterate throuhh each user to check for a match with provided credentials
    for (let user of users) {

        // split each user string by '/' to seperate stored username and password
        const [storedUsername, storedPassword] = user.split('/');

        // compare input username and password with stored values(trim whitespace)
        if (username.trim() === storedUsername.trim() && password === storedPassword.trim()) {

            // if match is found, return an object indicating successful login
            return { success: true };
        }
    }

    // if no match is found, return object indicating failure with error message
    return { success: false, message: 'Invalid credentials.' };
}

// asynchronous function to handle user signup
async function signup(username, password) {
    
    // retrieve list of users from the database
    const users = await db.getUsers();

    // check if provided username already exists in list of users
    if (users.some(user => user.split('/')[0].trim() === username.trim())) {

        // if a duplicate username is found, return object indicating failure with an error message
        return { success: false, message: 'Username already exists.' };
    }

    // if username is unique, save username and password to database
    await db.saveUser(username, password);

    // return an object indicating successful signup
    return { success: true };
}

// export login and sign up functions so they can be accessed from other modules
module.exports = { login, signup };
