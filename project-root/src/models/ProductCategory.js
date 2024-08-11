const { DataTypes } = require('sequelize');
const sequelize = require('./config/Database');
const Product = require('./Product'); 
const Category = require('./Category'); 

const ProductCategory = sequelize.define('ProductCategory', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product, // Nome do modelo que a chave estrangeira referencia
      key: 'id'
    },
    onDelete: 'CASCADE' // Remove o relacionamento se o produto for excluído
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category, // Nome do modelo que a chave estrangeira referencia
      key: 'id'
    },
    onDelete: 'CASCADE' // Remove o relacionamento se a categoria for excluída
  }
}, {
  timestamps: false 
});

// Definindo relacionamentos muitos-para-muitos
Product.belongsToMany(Category, { through: ProductCategory, foreignKey: 'product_id' });
Category.belongsToMany(Product, { through: ProductCategory, foreignKey: 'category_id' });

module.exports = ProductCategory;
