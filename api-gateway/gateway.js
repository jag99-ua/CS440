const express = require('express');
const axios = require('axios');
const app = express();
const port = 8080;

// Example routes for API Gateway
app.get('/auth/login', (req, res) => {
  axios.post('http://authentication-service:3000/auth/login', req.body)
    .then(response => res.json(response.data))
    .catch(error => res.status(500).send(error));
});

app.get('/workout/get', (req, res) => {
  axios.get('http://workout-service:3001/workout')
    .then(response => res.json(response.data))
    .catch(error => res.status(500).send(error));
});

app.get('/nutrition/tips', (req, res) => {
  axios.get('http://nutrition-tips-service:3002/nutrition/tips')
    .then(response => res.json(response.data))
    .catch(error => res.status(500).send(error));
});

app.listen(port, () => {
  console.log(`API Gateway running at http://localhost:${port}`);
});
