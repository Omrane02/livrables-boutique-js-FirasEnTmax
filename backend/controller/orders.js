const db = require('../database/db');

// POST passer une commande depuis le panier
const createOrder = async (req, res) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const { address_id } = req.body;

        // Vérifier que l'adresse appartient à l'utilisateur
        if (address_id) {
            const [address] = await connection.query(
                'SELECT id FROM addresses WHERE id = ? AND user_id = ?',
                [address_id, req.user.id]
            );
            if (address.length === 0) {
                await connection.rollback();
                return res.status(404).json({ error: 'Adresse introuvable' });
            }
        }

        // Récupérer le panier
        const [cartItems] = await connection.query(`
            SELECT c.*, pv.stock, p.price
            FROM cart c
            JOIN product_variants pv ON c.product_variant_id = pv.id
            JOIN products p ON pv.product_id = p.id
            WHERE c.user_id = ?
        `, [req.user.id]);

        if (cartItems.length === 0) {
            await connection.rollback();
            return res.status(400).json({ error: 'Le panier est vide' });
        }

        // Vérifier le stock
        for (const item of cartItems) {
            if (item.stock < item.quantity) {
                await connection.rollback();
                return res.status(400).json({ error: `Stock insuffisant pour le produit id ${item.product_variant_id}` });
            }
        }

        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Créer la commande avec l'adresse
        const [order] = await connection.query(
            'INSERT INTO orders (user_id, total, address_id) VALUES (?, ?, ?)',
            [req.user.id, total.toFixed(2), address_id || null]
        );

        const orderId = order.insertId;

        // Insérer les articles + décrémenter stock
        for (const item of cartItems) {
            await connection.query(
                'INSERT INTO order_items (order_id, product_variant_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.product_variant_id, item.quantity, item.price]
            );
            await connection.query(
                'UPDATE product_variants SET stock = stock - ? WHERE id = ?',
                [item.quantity, item.product_variant_id]
            );
        }

        // Vider le panier
        await connection.query('DELETE FROM cart WHERE user_id = ?', [req.user.id]);

        await connection.commit();

        res.status(201).json({ message: 'Commande passée avec succès', orderId });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
};

// GET historique des commandes
const getOrders = async (req, res) => {
    try {
        const [orders] = await db.query(`
            SELECT o.id, o.total, o.status, o.created_at
            FROM orders o
            WHERE o.user_id = ?
            ORDER BY o.created_at DESC
        `, [req.user.id]);

        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET détail d'une commande
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const [order] = await db.query(
            'SELECT * FROM orders WHERE id = ? AND user_id = ?',
            [id, req.user.id]
        );

        if (order.length === 0) {
            return res.status(404).json({ error: 'Commande introuvable' });
        }

        const [items] = await db.query(`
            SELECT 
                oi.quantity,
                oi.price,
                p.name,
                s.label AS size,
                col.name AS color
            FROM order_items oi
            JOIN product_variants pv ON oi.product_variant_id = pv.id
            JOIN products p ON pv.product_id = p.id
            LEFT JOIN sizes s ON pv.size_id = s.id
            JOIN colors col ON pv.color_id = col.id
            WHERE oi.order_id = ?
        `, [id]);

        res.json({ ...order[0], items });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createOrder, getOrders, getOrderById };