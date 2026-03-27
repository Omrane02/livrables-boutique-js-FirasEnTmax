const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST register
const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password, phone } = req.body;

        // Vérifier si l'email existe déjà
        const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insérer l'utilisateur
        const [result] = await db.query(`
            INSERT INTO users (first_name, last_name, email, password, phone)
            VALUES (?, ?, ?, ?, ?)
        `, [first_name, last_name, email, hashedPassword, phone]);

        res.status(201).json({ message: 'Compte créé avec succès', userId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }

        const user = users[0];

        // Vérifier le mot de passe
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }

        // Générer le token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Connexion réussie',
            token,
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET profil (route protégée)
const getProfile = async (req, res) => {
    try {
        const [users] = await db.query(
            'SELECT id, first_name, last_name, email, phone, role, created_at FROM users WHERE id = ?',
            [req.user.id]
        );
        res.json(users[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { register, login, getProfile };