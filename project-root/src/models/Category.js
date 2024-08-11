const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const Category = sequelize.define('Category', {

    // PRECISO CONFERIR O CODIGO

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    }}, {
    timestamps: true 
});

module.exports = Category;
