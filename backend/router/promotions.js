const express = require('express');
const router = express.Router();
const { getActivePromotions, getPromotionByProduct, createPromotion, deletePromotion } = require('../controller/promotions');
const { verifyToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/isAdmin');

// Routes publiques
router.get('/', getActivePromotions);
router.get('/product/:product_id', getPromotionByProduct);

// Routes admin
router.post('/', verifyToken, isAdmin, createPromotion);
router.delete('/:id', verifyToken, isAdmin, deletePromotion);

module.exports = router;