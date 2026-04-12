const db = require('../database/db');

// GET toutes les promotions actives
const getActivePromotions = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                pr.id AS promotion_id,
                pr.discount_percent,
                pr.start_date,
                pr.end_date,
                p.id AS product_id,
                p.name,
                p.price,
                ROUND(p.price - (p.price * pr.discount_percent / 100), 2) AS discounted_price,
                c.name AS category,
                b.name AS brand
            FROM promotions pr
            JOIN products p ON pr.product_id = p.id
            JOIN categories c ON p.category_id = c.id
            JOIN brands b ON p.brand_id = b.id
            WHERE NOW() BETWEEN pr.start_date AND pr.end_date
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET promotion d'un produit spécifique
const getPromotionByProduct = async (req, res) => {
    try {
        const { product_id } = req.params;

        const [rows] = await db.query(`
            SELECT 
                pr.id AS promotion_id,
                pr.discount_percent,
                pr.start_date,
                pr.end_date,
                p.price AS original_price,
                ROUND(p.price - (p.price * pr.discount_percent / 100), 2) AS discounted_price
            FROM promotions pr
            JOIN products p ON pr.product_id = p.id
            WHERE pr.product_id = ?
            AND NOW() BETWEEN pr.start_date AND pr.end_date
        `, [product_id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Aucune promotion active pour ce produit' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST créer une promotion (admin uniquement)
const createPromotion = async (req, res) => {
    try {
        const { product_id, discount_percent, start_date, end_date } = req.body;

        // Vérifier que le produit existe
        const [product] = await db.query('SELECT id FROM products WHERE id = ?', [product_id]);
        if (product.length === 0) {
            return res.status(404).json({ error: 'Produit introuvable' });
        }

        // Vérifier que le discount est valide
        if (discount_percent <= 0 || discount_percent > 100) {
            return res.status(400).json({ error: 'Le pourcentage doit être entre 1 et 100' });
        }

        // Vérifier les dates
        if (new Date(start_date) >= new Date(end_date)) {
            return res.status(400).json({ error: 'La date de fin doit être après la date de début' });
        }

        const [result] = await db.query(`
            INSERT INTO promotions (product_id, discount_percent, start_date, end_date)
            VALUES (?, ?, ?, ?)
        `, [product_id, discount_percent, start_date, end_date]);

        res.status(201).json({ message: 'Promotion créée avec succès', promotionId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE supprimer une promotion (admin uniquement)
const deletePromotion = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query('DELETE FROM promotions WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Promotion introuvable' });
        }

        res.json({ message: 'Promotion supprimée' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getActivePromotions, getPromotionByProduct, createPromotion, deletePromotion };