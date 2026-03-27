const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../controller/cart');
const { verifyToken } = require('../middleware/auth');

// Toutes les routes panier nécessitent d'être connecté
router.use(verifyToken);

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:id', updateCartItem);
router.delete('/clear', clearCart);
router.delete('/:id', removeFromCart);

module.exports = router;