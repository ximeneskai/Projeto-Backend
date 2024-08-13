const AuthService = require("../services/AuthService");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ error: 'Token is missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = AuthService.verifyToken(token);

    if (!decoded) {
        return res.status(400).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
};

module.exports = authMiddleware;