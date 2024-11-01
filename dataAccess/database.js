// import promise API of the 'fs' module to handle file operations asynchronously 
const fs = require('fs').promises;

// import path module to handle and manipulate file paths
const path = require('path');

// define path to database file by joining current directory with database.txt
const dbPath = path.join(__dirname, 'database.txt');

// asynchronous function to retrieve a list of users from the database
async function getUsers() {

    // read content of database file with utf8 encoding
    const data = await fs.readFile(dbPath, 'utf8');

    // split file content into lines and filter out any empty lines
    return data.split('\n').filter(Boolean);
}

// asynchronous function to save new user to database
async function saveUser(username, password) {

    // new user string format
    const newUser = `${username}/${password}\n`;

    // append new user string to database file
    await fs.appendFile(dbPath, newUser);
}

// export getUsers and saveUser functions for access from other modules
module.exports = { getUsers, saveUser };
