const db = require('../database/db');

// GET tous les produits
const getAllProducts = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT p.*, c.name AS category, b.name AS brand
            FROM products p
            JOIN categories c ON p.category_id = c.id
            JOIN brands b ON p.brand_id = b.id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET un produit par id avec ses variantes
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const [product] = await db.query(`
            SELECT p.*, c.name AS category, b.name AS brand
            FROM products p
            JOIN categories c ON p.category_id = c.id
            JOIN brands b ON p.brand_id = b.id
            WHERE p.id = ?
        `, [id]);

        if (product.length === 0) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        const [variants] = await db.query(`
            SELECT pv.id, pv.stock, s.label AS size, col.name AS color
            FROM product_variants pv
            LEFT JOIN sizes s ON pv.size_id = s.id
            JOIN colors col ON pv.color_id = col.id
            WHERE pv.product_id = ?
        `, [id]);

        res.json({ ...product[0], variants });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET produits filtrés
const getProductsFiltered = async (req, res) => {
    try {
        const { category_id, brand_id, gender } = req.query;

        let query = `
            SELECT p.*, c.name AS category, b.name AS brand
            FROM products p
            JOIN categories c ON p.category_id = c.id
            JOIN brands b ON p.brand_id = b.id
            WHERE 1=1
        `;
        const params = [];

        if (category_id) { query += ' AND p.category_id = ?'; params.push(category_id); }
        if (brand_id)     { query += ' AND p.brand_id = ?';    params.push(brand_id); }
        if (gender)       { query += ' AND p.gender = ?';      params.push(gender); }

        const [rows] = await db.query(query, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET toutes les catégories
const getAllCategories = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categories');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET toutes les marques
const getAllBrands = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM brands');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllProducts, getProductById, getProductsFiltered, getAllCategories, getAllBrands };