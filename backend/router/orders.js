const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById } = require('../controller/orders');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);

module.exports = router;