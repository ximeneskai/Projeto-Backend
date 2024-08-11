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
      model: Product, // Nome do modelo que a chave estrangeira referencia
      key: 'id'
    },
    onDelete: 'CASCADE' // Remove imagens associadas se o produto for excluído
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false // Valor padrão definido como 0 (false)
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true  // Adiciona as colunas created_at e updated_at automaticamente
});

// Definindo relacionamento
Product.hasMany(ProductImage, { foreignKey: 'product_id' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = ProductImage;
