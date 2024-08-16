const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');
const Product = require('./Product');

const ProductOption = sequelize.define('ProductOption', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product, 
      key: 'id'
    },
    onDelete: 'CASCADE' 
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shape: {
    type: DataTypes.ENUM('square', 'circle'), //ESTUDAR ISSO AQUI
    defaultValue: 'square'
  },
  radius: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  type: {
    type: DataTypes.ENUM('text', 'color'),
    defaultValue: 'text'
  },
  values: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true  
});

// RELACIONAMENTO DE TABELAS

Product.hasMany(ProductOption, { foreignKey: 'product_id' });
ProductOption.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = ProductOption;
