const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config(); 
const tennisRouter = require('./router/tennis');
const authRouter = require('./router/auth');
const cartRouter = require('./router/cart');
const ordersRouter = require('./router/orders');
const favoritesRouter = require('./router/favorites');
const addressesRouter = require('./router/addresses');

const db = require('./database/db');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', tennisRouter);
app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/addresses', addressesRouter);

// TEST DB (TEMPORAIRE)
const testDB = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        console.log('Produits récupérés ✅', rows.length, 'produits trouvés');
    } catch (err) {
        console.error('Erreur SQL ❌', err.message);
    }
};
testDB();

// Route test
app.get('/', (req, res) => {
    res.send('API Tennis Store 🎾');
});

// Lancement serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});