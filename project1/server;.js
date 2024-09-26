const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos
app.use(express.static(__dirname));
app.use(express.json());

// Ruta para verificar las credenciales
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

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
