const express = require('express');
const app = express();

const tennisRoutes = require('./router/tennis');

app.use(express.json());

// route principale API
app.use('/api', tennisRoutes);

app.listen(3000, () => {
    console.log('Serveur lancé sur http://localhost:3000');
});