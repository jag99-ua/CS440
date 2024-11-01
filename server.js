// import modules and controllers
const express = require('express');
const authController = require('./businessLogic/authController');
const workoutController = require('./businessLogic/workoutController');

// initialize express application and define port numb
const app = express();
const PORT = 3000;

// middleware to parse JSON requests
app.use(express.json());

// serve static files from presentation directory
app.use(express.static('presentation'));


// POST route for login requests
app.post('/login', async (req, res) => {

    // call login method in authController with username and password from request body
    const result = await authController.login(req.body.username, req.body.password);

    // send result as response
    res.send(result);
});


// POST route for signup requests
app.post('/signup', async (req, res) => {

    // call signup method in authController with username and password from request body
    const result = await authController.signup(req.body.username, req.body.password);

    // send result as response
    res.send(result);
});

// GET route for fetching workouts by type
app.get('/workouts', async (req, res) => {

    // call getWorkoutByType with type from request body
    const exercises = await workoutController.getWorkoutByType(req.query.type);
    res.json({ exercises });
});

// startserver and listen for requests on the defined port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
