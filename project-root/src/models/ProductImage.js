const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');
const Product = require('./Product');

const ProductImage = sequelize.define('ProductImage', {
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
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false 
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true  
});

// RELACIONAMENTO DE TABELAS 

Product.hasMany(ProductImage, { foreignKey: 'product_id' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = ProductImage;
