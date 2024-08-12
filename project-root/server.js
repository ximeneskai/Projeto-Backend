const express = require('express');
const sequelize = require('./src/config/Database');
const User = require('./src/models/user');
const Category = require('./src/models/Category');
const { Op } = require('sequelize');
const Product = require('./src/models/Product');
const ProductImage = require('./src/models/ProductImage');
const ProductOption = require('./src/models/ProductOption');
const ProductCategory = require('./src/models/ProductCategory');

const app = express();
const PORT = 3000;


// Middleware para parsing JSON - interpreta e converte os dados JSON que chegam no body das requisições HTTP em objetos JavaScript acessíveis no código.
app.use(express.json()); 


// SINCRONIZAÇÃO DE TABELA ANTES DE INICIAR O SERVIDOR
sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });



//------------------------------------USUARIOS-------------------------------//

// ROTA DE BUSCA DO USUARIO PELO ID
app.get('/v1/user/:id', async (req, res) => {
    const { id } = req.params;
      try {
      const user = await User.findByPk(id, {
            attributes: ['id', 'firstname', 'surname', 'email'] });
      if (!user) {
        return res.status(404).json({
             message: 'Usuário não encontrado' });
      } 
      res.status(200).json(user);} 
      catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });


// ROTA PARA CADASTRAR NOVO USUÁRIO
app.post('/v1/user', async (req, res) => {
    const { firstname, surname, email, password, confirmPassword } = req.body;
// VERIFICANDO OS CAMPOS OBRIGATÓRIOS
    if (!firstname || !surname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
// VERIFICANDO A SENHA
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'As senhas não coincidem.' });
    } try {
// VERIFICANDO O EMAIL
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'E-mail já está em uso.' });
      }
// CRIANDO NOVO USUÁRIO
      const newUser = await User.create({
        firstname,
        surname,
        email,
        password
      });

        res.status(201).json({
            message: 'Usuário cadastrado com sucesso.'
      });} catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  });
  

// ROTA DE ATUALIZAÇÃO DO USUÁRIO
app.put('/v1/user/:id', async (req, res) => {
    const { id } = req.params;
    const { firstname, surname, email } = req.body;
  
    if (!firstname || !surname || !email) {
      return res.status(400).json({ 
        message: 'Todos os campos são obrigatórios.' });
    } try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
// PARA ATUALIZAR
      await user.update({ firstname, surname, email });
      res.status(200).json({ 
        message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  });
  

// ROTA PARA DELETAR USUÁRIO
app.delete('/v1/user/:id', async (req, res) => {
    const { id } = req.params;
      try { const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ 
            message: 'Usuário não encontrado' });
      }  
      await user.destroy();
      res.status(200).json({ 
        message: 'Usuário deletado com sucesso!' });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({ 
        message: 'Erro interno do servidor.' });
    }
  });



//------------------------------------CATEGORIAS-------------------------------//

// ROTA PARA OBTER LISTA DE CATEGORIAS
app.get('/v1/category/search', async (req, res) => {
    // Para definir parâmetros de consulta:
    const limit = parseInt(req.query.limit) || 12;
    const page = parseInt(req.query.page) || 1;
    const fields = req.query.fields ? req.query.fields.split(',') : ['id', 'name', 'slug', 'use_in_menu'];
    const useInMenu = req.query.use_in_menu === 'true';
  
    // Validar parâmetros de consulta
    if (isNaN(limit) || limit < -1) {
      return res.status(400).json({ 
        message: 'Parâmetro "limit" inválido.' });
    } if (isNaN(page) || page < 1) {
      return res.status(400).json({ 
        message: 'Parâmetro "page" inválido.' });
    } try {
      const query = {
        attributes: fields,
        where: {},
        limit: limit === -1 ? undefined : limit,
        offset: limit === -1 ? undefined : (page - 1) * limit
      }; if (useInMenu) {
        query.where.use_in_menu = true;}
  
    // BUSCANDO CATEGORIAS
      const { count, rows } = await Category.findAndCountAll(query);
  
      // Responder com os dados
      res.status(200).json({
        data: rows,
        total: count,
        limit,
        page
      });
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  });


// ROTA DE INFORMAÇÕES DA CATEGORIA PELO ID
app.get('/v1/category/:id', async (req, res) => {
    const { id } = req.params;
      try {
        const category = await Category.findByPk(id);
        if (!category) {return res.status(404).json({ 
            message: 'Categoria não encontrada' }
        );}
      res.status(200).json(category);
    } catch (error) {
      console.error('Erro ao buscar categoria:', error);
      res.status(500).json({ 
        message: 'Erro interno do servidor.' });
    }
  });


// ROTA PARA CRIAÇÃO DE NOVA CATEGORIA
app.post('/v1/category', async (req, res) => {
    const { name, slug, use_in_menu } = req.body;
    if (!name || !slug) {return res.status(400).json({ 
        message: 'Nome e slug são obrigatórios.' });
    } try {
      const newCategory = await Category.create({
        name,
        slug,
        use_in_menu: use_in_menu || false
      });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      res.status(500).json({ 
        message: 'Erro interno do servidor.' });
    }
  });


// ROTA DE ATUALIZAÇÃO DE CATEGORIA
app.put('/v1/category/:id', async (req, res) => {
    const { id } = req.params;
    const { name, slug, use_in_menu } = req.body;
    if (!name || !slug) { return res.status(400).json({ 
        message: 'Nome e slug são obrigatórios.' });
    } try {
      const category = await Category.findByPk(id);
      if (!category) { return res.status(404).json({ 
        message: 'Categoria não encontrada.' });
      }
      await category.update({
        name,
        slug,
        use_in_menu: use_in_menu || false
      });  
      res.status(200).json({ message: 'Categoria atualizada com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  });
  
// ROTA PARA DELETAR UMA CATEGORIA
app.delete('/v1/category/:id', async (req, res) => {
    const { id } = req.params;
      try {
      const category = await Category.findByPk(id);
      if (!category) { return res.status(404).json({ 
        message: 'Categoria não encontrada.' });
      }
      await category.destroy();
      res.status(200).json({ message: 'Categoria deletada com sucesso!' });
    } catch (error) { console.error('Erro ao deletar categoria:', error);
      res.status(500).json({ 
        message: 'Erro interno do servidor.' });
    }
  });


//------------------------------------PRODUTOS-------------------------------//


// LISTA DE PRODUTOS COM FILTROS
app.get('/v1/product/search', async (req, res) => {
    const { limit = 12, page = 1, fields, match, category_ids, 'price-range': priceRange, 'option[45]': optionValues } = req.query;
  
    const filters = {};
    const options = {
      include: [
        { model: ProductImage, attributes: ['id', 'content'] },
        { model: ProductOption, attributes: ['id', 'value'] },
        { model: ProductCategory, attributes: ['id'] }
      ],
      attributes: [],
      limit: parseInt(limit, 10),
      offset: (parseInt(page, 10) - 1) * parseInt(limit, 10)
    };
  
    // Filtragem por termo de busca
    if (match) {
      filters[Op.or] = [
        { name: { [Op.iLike]: `%${match}%` } },
        { description: { [Op.iLike]: `%${match}%` } }
      ];
    }
  
    // Filtragem por categorias
    if (category_ids) {
      filters[Op.and] = [
        { '$ProductCategories.id$': { [Op.in]: category_ids.split(',').map(id => parseInt(id, 10)) } }
      ];
    }
  
    // Filtragem por faixa de preço
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      filters[Op.and] = [
        ...(filters[Op.and] || []),
        { price: { [Op.between]: [minPrice, maxPrice] } }
      ];
    }
  
    // Filtragem por valores de opções
    if (optionValues) {
      filters[Op.and] = [
        ...(filters[Op.and] || []),
        { '$ProductOptions.value$': { [Op.in]: optionValues.split(',') } }
      ];
    }
  
    // Definindo os campos a serem retornados
    if (fields) {
      options.attributes = fields.split(',');
    } else {
      options.attributes.push('id', 'enabled', 'name', 'slug', 'stock', 'description', 'price', 'price_with_discount');
    }
  
    try {
      const { count, rows } = await Product.findAndCountAll({
        where: filters,
        ...options
      });
  
      const data = rows.map(product => ({
        id: product.id,
        enabled: product.enabled,
        name: product.name,
        slug: product.slug,
        stock: product.stock,
        description: product.description,
        price: product.price,
        price_with_discount: product.price_with_discount,
        category_ids: product.ProductCategories.map(category => category.id),
        images: product.ProductImages.map(image => ({
          id: image.id,
          content: image.content
        })),
        options: product.ProductOptions.map(option => ({
          id: option.id,
          value: option.value
        }))
      }));
  
      res.status(200).json({
        data,
        total: count,
        limit: parseInt(limit, 10),
        page: parseInt(page, 10)
      });
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
      res.status(400).json({ message: 'Erro ao obter produtos.' });
    }
  });
  

// INFORMAÇÕES DO PRODUTO PELO ID
app.get('/v1/product/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id, {
        include: [
          { model: ProductImage, attributes: ['id', 'content'] },
          { model: ProductOption, attributes: ['id', 'value'] },
          { model: Category, attributes: ['id'] } // Inclua Category diretamente
        ]
      });
  
      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }
  
      const response = {
        id: product.id,
        enabled: product.enabled,
        name: product.name,
        slug: product.slug,
        stock: product.stock,
        description: product.description,
        price: product.price,
        price_with_discount: product.price_with_discount,
        category_ids: product.Categories.map(category => category.id), // Use Categories aqui
        images: product.ProductImages.map(image => ({
          id: image.id,
          content: image.content
        })),
        options: product.ProductOptions.map(option => ({
          id: option.id,
          value: option.value
        }))
      };
  
      res.status(200).json(response);
    } catch (error) {
      console.error('Erro ao obter produto:', error);
      res.status(500).json({ message: 'Erro ao obter produto.' });
    }
  });

// CRIAÇÃO DO PRODUTO
app.post('/v1/product', async (req, res) => {
    const {
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids,
      images,
      options
    } = req.body;
  
    try {
      // Validar dados obrigatórios
      if (!name || !slug || price === undefined || price_with_discount === undefined) {
        return res.status(400).json({ message: 'Dados obrigatórios não fornecidos.' });
      }
  
      // Criar o produto
      const newProduct = await Product.create({
        enabled,
        name,
        slug,
        stock,
        description,
        price,
        price_with_discount
      });
  
      console.log('Produto criado:', newProduct);
  
      // Associar categorias ao produto
      if (category_ids && category_ids.length) {
        await newProduct.addCategories(category_ids);
        console.log('Categorias associadas:', category_ids);
      }
  
      // Adicionar imagens ao produto
      if (images && images.length) {
        for (const img of images) {
          await ProductImage.create({
            product_id: newProduct.id,
            type: img.type,
            content: img.content
          });
          console.log('Imagem adicionada:', img);
        }
      }
  
      // Adicionar opções ao produto
      if (options && options.length) {
        for (const opt of options) {
          const newOption = await ProductOption.create({
            product_id: newProduct.id,
            title: opt.title,
            shape: opt.shape || 'square',
            radius: opt.radius || '0',
            type: opt.type || 'text'
          });
  
          console.log('Opção criada:', newOption);
  
          // Adicionar valores da opção
          if (opt.value) {
            for (const value of opt.value) {
              await newOption.addValue(value);
              console.log('Valor da opção adicionado:', value);
            }
          }
        }
      }
  
      res.status(201).json({ message: 'Produto criado com sucesso!' });
    } catch (error) {
      console.error('Erro ao criar produto:', error.message);
      res.status(400).json({ message: 'Erro ao criar produto.' });
    }
  });

//ATUALIZAÇÃO DO PRODUTO 
app.put('/v1/product/:id', async (req, res) => {
    const { id } = req.params;
    const {
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids,
      images,
      options,
    } = req.body;
  
    try {
      // Encontrar o produto pelo ID
      const product = await Product.findByPk(id);
      
      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
  
      // Atualizar informações do produto
      await product.update({
        enabled,
        name,
        slug,
        stock,
        description,
        price,
        price_with_discount,
      });
  
      // Atualizar as categorias associadas (se necessário)
      if (category_ids) {
        await product.setCategories(category_ids); // Ajuste conforme o relacionamento definido
      }
  
      // Atualizar as imagens associadas (se necessário)
      if (images) {
        for (const image of images) {
          if (image.deleted) {
            await ProductImage.destroy({ where: { id: image.id } });
          } else {
            await ProductImage.upsert({
              id: image.id,
              type: image.type,
              content: image.content,
              productId: id
            });
          }
        }
      }
  
      // Atualizar as opções associadas (se necessário)
      if (options) {
        for (const option of options) {
          if (option.deleted) {
            await ProductOption.destroy({ where: { id: option.id } });
          } else {
            await ProductOption.upsert({
              id: option.id,
              title: option.title,
              shape: option.shape,
              radius: option.radius,
              type: option.type,
              value: option.value,
              productId: id
            });
          }
        }
      }
  
      // Responder com uma mensagem de sucesso
      res.status(204).send({ message: "Produto atualizado com sucesso!"}); // No Content
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(400).json({ message: 'Erro ao atualizar produto', error: error.message });
    }
  });

// DELETAR PRODUTO
app.delete('/v1/product/:id', async (req, res) => {
    const { id } = req.params;
      try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      await product.destroy();
      res.status(200).json({ message: 'Produto deletado com sucesso.'
      }); } catch (error) {
      console.error('Erro ao deletar produto:', error);
      // Tratar casos de erro inesperado
      res.status(500).json({ 
        message: 'Erro interno do servidor', error: error.message });
    } });
  