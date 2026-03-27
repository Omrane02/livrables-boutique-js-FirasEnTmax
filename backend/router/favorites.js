const express = require('express');
const router = express.Router();
const { getFavorites, addFavorite, removeFavorite } = require('../controller/favorites');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:product_id', removeFavorite);

module.exports = router;