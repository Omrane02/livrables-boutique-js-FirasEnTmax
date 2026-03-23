// =============================================
// backend/controller/tennis.js
// =============================================

const db = require('../database/migration.sql');

// ─────────────────────────────────────────────
// GET /api/products
// Tous les produits avec leur catégorie et marque
// ─────────────────────────────────────────────
const getAllProducts = (req, res) => {
    const sql = `
        SELECT 
            p.id,
            p.name,
            p.description,
            p.price,
            p.gender,
            p.created_at,
            c.id   AS category_id,
            c.name AS category,
            b.id   AS brand_id,
            b.name AS brand
        FROM products p
        JOIN categories c ON p.category_id = c.id
        JOIN brands     b ON p.brand_id    = b.id
        ORDER BY p.id ASC
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// ─────────────────────────────────────────────
// GET /api/products/:id
// Un produit par ID avec ses variantes
// ─────────────────────────────────────────────
const getProductById = (req, res) => {
    const { id } = req.params;

    const sqlProduct = `
        SELECT 
            p.id,
            p.name,
            p.description,
            p.price,
            p.gender,
            c.id   AS category_id,
            c.name AS category,
            b.id   AS brand_id,
            b.name AS brand
        FROM products p
        JOIN categories c ON p.category_id = c.id
        JOIN brands     b ON p.brand_id    = b.id
        WHERE p.id = ?
    `;

    const sqlVariants = `
        SELECT 
            pv.id,
            pv.stock,
            s.label AS size,
            co.name AS color
        FROM product_variants pv
        LEFT JOIN sizes  s  ON pv.size_id  = s.id
        LEFT JOIN colors co ON pv.color_id = co.id
        WHERE pv.product_id = ?
    `;

    db.query(sqlProduct, [id], (err, productResult) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!productResult.length) return res.status(404).json({ error: 'Produit introuvable' });

        db.query(sqlVariants, [id], (err2, variants) => {
            if (err2) return res.status(500).json({ error: err2.message });
            res.json({ ...productResult[0], variants });
        });
    });
};

// ─────────────────────────────────────────────
// GET /api/products/:id/variants
// Les variantes (tailles + couleurs) d'un produit
// ─────────────────────────────────────────────
const getProductVariants = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT 
            pv.id,
            pv.stock,
            s.label AS size,
            co.name AS color
        FROM product_variants pv
        LEFT JOIN sizes  s  ON pv.size_id  = s.id
        LEFT JOIN colors co ON pv.color_id = co.id
        WHERE pv.product_id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// ─────────────────────────────────────────────
// GET /api/categories
// Toutes les catégories
// ─────────────────────────────────────────────
const getCategories = (req, res) => {
    db.query('SELECT * FROM categories ORDER BY id ASC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// ─────────────────────────────────────────────
// GET /api/brands
// Toutes les marques
// ─────────────────────────────────────────────
const getBrands = (req, res) => {
    db.query('SELECT * FROM brands ORDER BY id ASC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// ─────────────────────────────────────────────
// GET /api/products/filter
// Filtrer les produits par catégorie, marque, genre, prix
// Exemple : /api/products/filter?category_id=2&brand_id=4&gender=homme&maxPrice=100
// ─────────────────────────────────────────────
const filterProducts = (req, res) => {
    const { category_id, brand_id, gender, maxPrice } = req.query;

    let sql = `
        SELECT 
            p.id,
            p.name,
            p.description,
            p.price,
            p.gender,
            c.id   AS category_id,
            c.name AS category,
            b.id   AS brand_id,
            b.name AS brand
        FROM products p
        JOIN categories c ON p.category_id = c.id
        JOIN brands     b ON p.brand_id    = b.id
        WHERE 1=1
    `;

    const params = [];

    if (category_id) {
        sql += ' AND p.category_id = ?';
        params.push(category_id);
    }

    if (brand_id) {
        sql += ' AND p.brand_id = ?';
        params.push(brand_id);
    }

    if (gender && gender !== 'all') {
        sql += " AND (p.gender = ? OR p.gender = 'unisex')";
        params.push(gender);
    }

    if (maxPrice) {
        sql += ' AND p.price <= ?';
        params.push(maxPrice);
    }

    sql += ' ORDER BY p.id ASC';

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// ─────────────────────────────────────────────
// EXPORTS — doit correspondre exactement au router
// ─────────────────────────────────────────────
module.exports = {
    getAllProducts,
    getProductById,
    getProductVariants,
    getCategories,
    getBrands,
    filterProducts,
};