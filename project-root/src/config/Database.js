const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: "projeto",
    host: "localhost",
    username: "root",
    password: "7721", 
    port: 3306
});

module.exports = sequelize;