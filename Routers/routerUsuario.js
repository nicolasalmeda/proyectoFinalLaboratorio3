const express = require('express');
const {Router} = require('express');
const {usuariosControllers} = require('../Controllers/usuariosControllers')

const routerUsuario = new Router;

routerUsuario.use(express.json());
routerUsuario.use(express.urlencoded({extended:true}));

routerUsuario.post('/api/createUser',usuariosControllers.createUser);
routerUsuario.post('/api/login',usuariosControllers.login);
routerUsuario.put('/api/updateUser/:id',usuariosControllers.updateUser);
routerUsuario.delete('/api/deleteUser/:id',usuariosControllers.deleteUser);
routerUsuario.get('/api/getAllUser',usuariosControllers.getAllUsers);

module.exports={routerUsuario};