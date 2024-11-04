// import workoutData module from data access layer
const workoutData = require('../Model/workoutData');

// asynchronous function to get workouts based on specified type
async function getWorkoutByType(type) {

    // retrieve ALL workout data from workoutData module
    const workouts = await workoutData.getWorkouts();

    // reg expression to match specific workout type section within the data
    const regex = new RegExp(`\\[${type}\\]([\\s\\S]*?)(\\[|$)`, 'g');

    // execute regex on workouts data to find a match for specified type
    const match = regex.exec(workouts);

    // if match is found, split into array, otherwise return empty array
    return match ? match[1].trim().split('\n') : [];
    
}

// export function for use in other modules
module.exports = { getWorkoutByType };
