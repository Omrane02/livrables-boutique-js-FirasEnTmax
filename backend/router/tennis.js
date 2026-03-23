const express = require('express');
const router = express.Router();

const tennisController = require('../controller/tennis');

// 📦 PRODUITS
router.get('/products', tennisController.getAllProducts);
router.get('/products/:id', tennisController.getProductById);

// 🎯 VARIANTS
router.get('/products/:id/variants', tennisController.getProductVariants);

// 🗂️ CATEGORIES
router.get('/categories', tennisController.getCategories);

// 🏷️ BRANDS
router.get('/brands', tennisController.getBrands);

// 🔍 FILTRES (important pour e-commerce)
router.get('/products/filter', tennisController.filterProducts);

module.exports = router;