const db = require('../database/db');

// GET toutes les adresses
const getAddresses = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC',
            [req.user.id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST ajouter une adresse
const addAddress = async (req, res) => {
    try {
        const { full_name, street, city, postal_code, country, is_default } = req.body;

        // Si nouvelle adresse par défaut, retirer l'ancien défaut
        if (is_default) {
            await db.query(
                'UPDATE addresses SET is_default = FALSE WHERE user_id = ?',
                [req.user.id]
            );
        }

        const [result] = await db.query(`
            INSERT INTO addresses (user_id, full_name, street, city, postal_code, country, is_default)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [req.user.id, full_name, street, city, postal_code, country || 'France', is_default || false]);

        res.status(201).json({ message: 'Adresse ajoutée', addressId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PUT définir une adresse par défaut
const setDefaultAddress = async (req, res) => {
    try {
        const { id } = req.params;

        // Retirer l'ancien défaut
        await db.query(
            'UPDATE addresses SET is_default = FALSE WHERE user_id = ?',
            [req.user.id]
        );

        // Définir le nouveau défaut
        const [result] = await db.query(
            'UPDATE addresses SET is_default = TRUE WHERE id = ? AND user_id = ?',
            [id, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Adresse introuvable' });
        }

        res.json({ message: 'Adresse par défaut mise à jour' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE supprimer une adresse
const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            'DELETE FROM addresses WHERE id = ? AND user_id = ?',
            [id, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Adresse introuvable' });
        }

        res.json({ message: 'Adresse supprimée' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAddresses, addAddress, setDefaultAddress, deleteAddress };