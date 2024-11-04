// import promises API of 'fs' module to handle file operations asynchronously
const fs = require('fs').promises;

// import 'path' module to handle and manipulate file paths
const path = require('path');

// define path to workouts data file by joining current dir with 'workouts.txt'
const workoutPath = path.join(__dirname, 'workouts.txt');

// asynchronous function to retrieve workoutdata from the workouts file
async function getWorkouts() {

    // read contents of workouts file in UTF-8 encoding and return
    return await fs.readFile(workoutPath, 'utf8');
}

// export getWorkouts function for other modules
module.exports = { getWorkouts };
