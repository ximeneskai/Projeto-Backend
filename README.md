# 🚀 Projeto Backend

Este projeto faz parte da avaliação dos conteúdos de Backend do curso de Desenvolvimento Web Full Stack oferecido pela Geração Tech. 

## 🖇️ Sumário

- [Instalação e Execução da API](#instalacao-e-execucao-da-api)
- [Requisitos da Avaliação](#requisitos-da-avaliacao)
- [Rotas da API](#rotas-da-api)

## 🔧 Instalação e Execução da API

### ⚙️ Bibliotecas e Dependências

- Node.js
- NPM
- Express.js
- Dotenv
- Nodemon 
- MySQL
- Sequelize
- JsonWebToken

### ⌨️ Passos para Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/ximeneskai/projeto-backend.git
    cd projeto-backend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

### ⌨️ Rodando o Servidor

Para iniciar o servidor em modo de desenvolvimento, execute:

```bash
node server.js
```
O servidor estará disponível em http://localhost:3000.

## 📋 Requisitos da Avaliação

#### Seção 01 - Implementar o banco de dados da aplicação
Requisito 01 ✅ - Criar a tabela de usuários  <br>
Requisito 02 ✅ - Criar a tabela de categorias <br>
Requisito 03 ✅ - Criar a tabela de produtos <br>
Requisito 04 ✅ - Criar a tabela de imagens do produto <br>
Requisito 05 ✅ - Criar a tabela de opções do produto <br>
Requisito 06 ✅ - Criar a tabela de produtos e categoria <br>

#### Seção 02 - Implementar endpoints para o CRUD de usuarios
Requisito 01 ✅ - Criar endpoint para obter informações do usuário pelo ID <br>
Requisito 02 ✅ - Criar endpoint de cadastro de usuário <br>
Requisito 03 ✅ - Criar endpoint atualizar usuário <br>
Requisito 04 ✅ - Criar endpoint de deletar usuário <br>

#### Seção 03 - Implementar endpoints para o CRUD de categorias
Requisito 01 ✅ - Criar endpoint para obter uma lista de categorias <br>
Requisito 02 ✅ - Criar endpoint para obter informações da categoria pelo ID <br>
Requisito 03 ✅ - Criar endpoint de cadastro de categoria <br>
Requisito 04 ✅ - Criar endpoint de atualização de categoria <br>
Requisito 05 ✅ - Criar endpoint de deletar categoria <br>

#### Seção 04 - Implementar endpoints para o CRUD de produtos
Requisito 01 ✅ - Criar endpoint para obter uma lista de produtos <br>
Requisito 02 ✅ - Criar endpoint para obter informações do produto pelo ID <br>
Requisito 03 ✅ - Criar endpoint de criação de produto <br>
Requisito 04 ✅ - Criar endpoint de atualização de produto <br>
Requisito 05 ✅ - Criar endpoint de atualização de produto <br>

#### Seção 05 - Implementar e validar token JWT
Requisito 01 ✅ - Criar endpoint de geração do token JWT <br>
Requisito 02 ✅ - Validar token nos métodos POST, PUT e DELETE <br>

## 🖇️ Rotas da API

#### Autenticação
POST /v1/user/token - Gera um token JWT para autenticação. <br>
<br>
⚠️ O Token será necessário em todas as rotas POST - PUT - DELETE.

#### Categorias
GET /v1/category - Lista todas as categorias.<br>
POST /v1/category - Cria uma nova categoria.<br>
PUT /v1/category/:id - Atualiza uma categoria existente.<br>
DELETE /v1/category/:id - Remove uma categoria.<br>

#### Produtos
GET /v1/product - Lista todos os produtos. <br>
POST /v1/product - Cria um novo produto. <br>
PUT /v1/product/:id - Atualiza um produto existente. <br>
DELETE /v1/product/:id - Remove um produto. <br>

#### Usuários
GET /v1/user - Lista todos os usuários.<br>
POST /v1/user - Cria um novo usuário.<br>
PUT /v1/user/:id - Atualiza um usuário existente.<br>
DELETE /v1/user/:id - Remove um usuário.<br>



