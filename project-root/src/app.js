const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/AuthMiddleware');
const User = require('./models/user');

const app = express();
app.use(express.json());


app.post('/v1/user/token', async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const user = await User.findOne({ 
            where: { email, password } });
  
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
  
      // Gerar o token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor', error });
    }
  });
  
  module.exports = app;