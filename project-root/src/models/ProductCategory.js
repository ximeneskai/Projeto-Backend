const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');
const Product = require('./Product'); 
const Category = require('./Category'); 

const ProductCategory = sequelize.define('ProductCategory', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category, 
      key: 'id'
    },
    onDelete: 'CASCADE' 
  }
}, {
  timestamps: false 
});

// RELACIONAMENTO DE TABELAS 

Product.belongsToMany(Category, { through: ProductCategory, foreignKey: 'product_id' });
Category.belongsToMany(Product, { through: ProductCategory, foreignKey: 'category_id' });

module.exports = ProductCategory;
