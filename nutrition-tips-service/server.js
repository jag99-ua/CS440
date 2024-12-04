const express = require('express');
const app = express();
const port = 3002;

let nutritionTips = [
  { id: 1, tip: "Eat a balanced diet" },
  { id: 2, tip: "Drink plenty of water" }
];

app.get('/nutrition/tips', (req, res) => {
  res.json(nutritionTips);
});

app.listen(port, () => {
  console.log(`Nutrition Tips Service running at http://localhost:${port}`);
});
