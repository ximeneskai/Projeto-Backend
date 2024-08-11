const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false // Valor padrão definido como 0 (false)
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  use_in_menu: {
    type: DataTypes.BOOLEAN,
    defaultValue: false // Valor padrão definido como 0 (false)
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0 // Valor padrão definido como 0
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true // Coluna opcional
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  price_with_discount: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: true  // Adiciona as colunas created_at e updated_at automaticamente
});

module.exports = Product;
