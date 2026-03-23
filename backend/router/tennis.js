const express = require('express');
const router  = express.Router();

const tennisController = require('../controller/tennis');

// ⚠️ Routes STATIQUES avant routes avec paramètres (:id)

// 🔍 FILTRE — AVANT /products/:id obligatoirement
router.get('/products/filter', tennisController.filterProducts);

// 🗂️ CATEGORIES
router.get('/categories', tennisController.getCategories);

// 🏷️ BRANDS
router.get('/brands', tennisController.getBrands);

// 📦 PRODUITS
router.get('/products',     tennisController.getAllProducts);
router.get('/products/:id', tennisController.getProductById);

// 🎯 VARIANTS
router.get('/products/:id/variants', tennisController.getProductVariants);

module.exports = router;