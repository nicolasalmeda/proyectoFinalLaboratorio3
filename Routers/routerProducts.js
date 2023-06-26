const express = require('express');
const {Router} = require('express');
const {productsControllers} = require('../Controllers/productsControllers');

const routerProducts = new Router();

routerProducts.use(express.json());
routerProducts.use(express.urlencoded({extended:true}));

routerProducts.get('/api/productos', productsControllers.getAllProducts);

module.exports={routerProducts};