const express = require('express');
const cors    = require('cors');
const app     = express();

const tennisRoutes = require('./router/tennis');

app.use(cors());         // ← AJOUT : autorise le frontend à appeler l'API
app.use(express.json());

// route principale API
app.use('/api', tennisRoutes);

app.listen(3000, () => {
    console.log('Serveur lancé sur http://localhost:3000');
});