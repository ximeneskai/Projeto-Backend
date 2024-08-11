const { error } = require('console');
const sequelize = require('../config/Database');
const User = require('./models/user');
const Category = require('./models/Category');
const Product = require('./models/Product');
const ProductImage = require('./models/ProductImage');
const ProductOption = require('./models/ProductOption');
const ProductCategory = require('./models/ProductCategory');


//PARA SINCRONIZAR OS COMANDOS DE TABELA

sequelize.sync({ force: true })
    .then(() => {
        console.log('Tabelas sincronizadas com sucesso.');
        
    })
    .catch(error => {
        console.error('Erro ao sincronizar tabela:', error);
    })


