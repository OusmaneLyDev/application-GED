// src/middleware/Auth.js
import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).json({ message: 'Accès refusé' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token invalide' });
    }
};

export default authenticateToken;
