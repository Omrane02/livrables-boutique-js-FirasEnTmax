const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, getProductsFiltered, getAllCategories, getAllBrands } = require('../controller/tennis');

router.get('/products', getAllProducts);
router.get('/products/filter', getProductsFiltered);
router.get('/products/:id', getProductById);
router.get('/categories', getAllCategories);
router.get('/brands', getAllBrands);

module.exports = router;
