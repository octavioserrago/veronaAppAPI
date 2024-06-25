const express = require('express');
const bodyParser = require('body-parser');

const branchRoute = require('./src/routes/branchRoute');
const roleRoute = require('./src/routes/roleRoute');
const userRoute = require('./src/routes/userRoute');
const saleRoute = require('./src/routes/saleRoute');

const app = express();
const port = 8888;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rutas
app.use('/branches', branchRoute);
app.use('/roles', roleRoute);
app.use('/users', userRoute);
app.use('/sales', saleRoute)

app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi aplicación!');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en: http://localhost:${port}`);
});
