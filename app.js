const express = require('express');
const bodyParser = require('body-parser');

const branchRoute = require('./src/routes/branchRoute');
const roleRoute = require('./src/routes/roleRoute');

const app = express();
const port = 8888;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rutas
app.use('/branches', branchRoute);  // Monta las rutas de branchRoute bajo /branches
app.use('/roles', roleRoute);  // Monta las rutas de roleRoute bajo /roles

app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi aplicación!');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en: http://localhost:${port}`);
});
