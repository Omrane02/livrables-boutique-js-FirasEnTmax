const db = require('../database/db');

// GET tous les favoris
const getFavorites = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT f.id AS favorite_id, p.id AS product_id, p.name, p.price, 
                   c.name AS category, b.name AS brand, p.gender
            FROM favorites f
            JOIN products p ON f.product_id = p.id
            JOIN categories c ON p.category_id = c.id
            JOIN brands b ON p.brand_id = b.id
            WHERE f.user_id = ?
        `, [req.user.id]);

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST ajouter un favori
const addFavorite = async (req, res) => {
    try {
        const { product_id } = req.body;

        const [product] = await db.query('SELECT id FROM products WHERE id = ?', [product_id]);
        if (product.length === 0) {
            return res.status(404).json({ error: 'Produit introuvable' });
        }

        await db.query(
            'INSERT IGNORE INTO favorites (user_id, product_id) VALUES (?, ?)',
            [req.user.id, product_id]
        );

        res.status(201).json({ message: 'Produit ajouté aux favoris' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE retirer un favori
const removeFavorite = async (req, res) => {
    try {
        const { product_id } = req.params;

        const [result] = await db.query(
            'DELETE FROM favorites WHERE user_id = ? AND product_id = ?',
            [req.user.id, product_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Favori introuvable' });
        }

        res.json({ message: 'Produit retiré des favoris' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getFavorites, addFavorite, removeFavorite };