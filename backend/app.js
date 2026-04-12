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
const promotionsRouter = require('./router/promotions');

const db = require('./database/db');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/images', express.static(require('path').join(__dirname, 'assets/img')));
app.use('/api', tennisRouter);
app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/addresses', addressesRouter);
app.use('/api/promotions', promotionsRouter);

// Lancement serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});