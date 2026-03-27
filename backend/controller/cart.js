const db = require('../database/db');

// GET panier de l'utilisateur connecté
const getCart = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                c.id AS cart_id,
                c.quantity,
                p.id AS product_id,
                p.name,
                p.price,
                s.label AS size,
                col.name AS color,
                pv.stock
            FROM cart c
            JOIN product_variants pv ON c.product_variant_id = pv.id
            JOIN products p ON pv.product_id = p.id
            LEFT JOIN sizes s ON pv.size_id = s.id
            JOIN colors col ON pv.color_id = col.id
            WHERE c.user_id = ?
        `, [req.user.id]);

        const total = rows.reduce((sum, item) => sum + item.price * item.quantity, 0);

        res.json({ items: rows, total: total.toFixed(2) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST ajouter un produit au panier
const addToCart = async (req, res) => {
    try {
        const { product_variant_id, quantity } = req.body;

        // Vérifier que la variante existe et a du stock
        const [variant] = await db.query(
            'SELECT * FROM product_variants WHERE id = ?',
            [product_variant_id]
        );

        if (variant.length === 0) {
            return res.status(404).json({ error: 'Variante introuvable' });
        }

        if (variant[0].stock < quantity) {
            return res.status(400).json({ error: 'Stock insuffisant' });
        }

        // Vérifier si l'article est déjà dans le panier
        const [existing] = await db.query(
            'SELECT * FROM cart WHERE user_id = ? AND product_variant_id = ?',
            [req.user.id, product_variant_id]
        );

        if (existing.length > 0) {
            // Mettre à jour la quantité
            await db.query(
                'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_variant_id = ?',
                [quantity, req.user.id, product_variant_id]
            );
        } else {
            // Ajouter au panier
            await db.query(
                'INSERT INTO cart (user_id, product_variant_id, quantity) VALUES (?, ?, ?)',
                [req.user.id, product_variant_id, quantity]
            );
        }

        res.status(201).json({ message: 'Produit ajouté au panier' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PUT modifier la quantité d'un article
const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({ error: 'La quantité doit être au moins 1' });
        }

        const [result] = await db.query(
            'UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?',
            [quantity, id, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Article non trouvé dans le panier' });
        }

        res.json({ message: 'Quantité mise à jour' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE supprimer un article du panier
const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            'DELETE FROM cart WHERE id = ? AND user_id = ?',
            [id, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Article non trouvé dans le panier' });
        }

        res.json({ message: 'Article supprimé du panier' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE vider tout le panier
const clearCart = async (req, res) => {
    try {
        await db.query('DELETE FROM cart WHERE user_id = ?', [req.user.id]);
        res.json({ message: 'Panier vidé' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };