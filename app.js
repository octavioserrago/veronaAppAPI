const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const branchRoute = require('./src/routes/branchRoute');
const roleRoute = require('./src/routes/roleRoute');
const userRoute = require('./src/routes/userRoute');
const saleRoute = require('./src/routes/saleRoute');
const moneyEntryRoute = require('./src/routes/moneyEntryRoute');
const creditVerificationRoute = require('./src/routes/creditVerificationsRoute')

const app = express();
const port = 8888;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/branches', branchRoute);
app.use('/roles', roleRoute);
app.use('/users', userRoute);
app.use('/sales', saleRoute);
app.use('/moneyEntries', moneyEntryRoute);
app.use('/creditVerifications', creditVerificationRoute);

app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi aplicación!');
});

app.listen(port, () => {
    console.log(`Servidor iniciado en: http://localhost:${port}`);
});
