const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

const AuthService = {
    generateToken: (user) => {
        const payload = {
            id: user.id,
            email: user.email
        };
        return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    },

    verifyToken: (token) => {
        try {
            return jwt.verify(token, SECRET_KEY);
        } catch (err) {
            return null;
        }
    }
};

module.exports = AuthService;