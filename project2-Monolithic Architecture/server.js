const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración de middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/web', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'web.html'));
});

// Ruta de registro de usuario
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const userData = `${username}/${password}\n`;

    fs.appendFile('database.txt', userData, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al registrar usuario');
        }
        res.redirect('/login');
    });
});

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile('database.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al iniciar sesión');
        }

        const users = data.split('\n').map(line => {
            const [user, pass] = line.split(', ').map(pair => pair.split(': ')[1]);
            return { username: user, password: pass };
        });

        const user = users.find(user => user.username === username && user.password === password);
        
        if (user) {
            res.redirect('/web');
        } else {
            res.status(401).send('Usuario o contraseña incorrectos');
        }
    });
});

app.get('/api/workouts', (req, res) => {
    fs.readFile('workout.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al cargar entrenamientos');
        }
        const workouts = data.split('\n').filter(line => line).map(line => line.trim());
        res.json(workouts);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
