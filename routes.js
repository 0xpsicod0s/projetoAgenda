const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');
const contatoController = require('./src/controllers/contatoController');

// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login', loginController.index);
route.post('/login', loginController.login);
route.get('/logout', loginController.logout);

// Rotas de registro
route.get('/register', registerController.index);
route.post('/register', registerController.register);

// Rotas de contato
route.get('/contato', contatoController.index);
route.post('/registerContact', contatoController.register);
route.get('/contato/:id', contatoController.editIndex);
route.post('/edit/:id', contatoController.edit);
route.get('/delete/:id', contatoController.delete);

module.exports = route;
