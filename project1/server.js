const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;


app.use(express.static(__dirname));
app.use(express.json());


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile('database.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error processing the file database.txt.');
        }

        const users = data.split('\n');
        for (let user of users) {
            const [storedUsername, storedPassword] = user.split('/');
            if (username.trim() === storedUsername.trim() && password === storedPassword.trim()) {
                return res.send({ success: true });
            }
        }

        res.send({ success: false });
    });
});


app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    fs.readFile('database.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error processing the file database.txt.');
        }

        const users = data.split('\n');
        for (let user of users) {
            const [storedUsername] = user.split('/');
            if (username.trim() === storedUsername.trim()) {
                return res.send({ success: false, message: 'Username already exists.' });
            }
        }

        fs.appendFile('database.txt', `${username}/${password}\n`, (err) => {
            if (err) {
                return res.status(500).send('Error saving user to the database.');
            }
            res.send({ success: true });
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
