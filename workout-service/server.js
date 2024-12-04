const express = require('express');
const app = express();
const port = 3001;

let workouts = [
  { id: 1, name: "Push-ups", duration: "10 minutes" },
  { id: 2, name: "Squats", duration: "15 minutes" }
];

app.get('/workout', (req, res) => {
  res.json(workouts);
});

app.listen(port, () => {
  console.log(`Workout Service running at http://localhost:${port}`);
});
