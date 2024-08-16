const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const User = sequelize.define('User', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
    }, 
    password: {
    type: DataTypes.STRING,
    allowNull: false
    }
}, {
    timestamps: true 
});

module.exports = User;
