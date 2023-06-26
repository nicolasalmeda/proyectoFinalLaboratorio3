const express = require('express');
const {Router} = require('express');
const {usuariosControllers} = require('../Controllers/usuariosControllers')

const routerUsuario = new Router;

routerUsuario.use(express.json());
routerUsuario.use(express.urlencoded({extended:true}));

routerUsuario.post('/api/createUser',usuariosControllers.createUser);

module.exports={routerUsuario};