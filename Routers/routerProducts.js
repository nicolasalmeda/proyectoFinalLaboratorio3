const express = require('express');
const {Router} = require('express');
const {productsControllers} = require('../Controllers/productsControllers');

const routerProducts = new Router();

routerProducts.use(express.json());
routerProducts.use(express.urlencoded({extended:true}));

routerProducts.get('/api/productos', productsControllers.getAllProducts);
routerProducts.get('/api/productos/:id', productsControllers.getOneProduct);
routerProducts.post('/api/createProductos',productsControllers.createProductos)
routerProducts.put('/api/updateProductos/:id',productsControllers.updateProducto)
routerProducts.delete('/api/deleteProducto/:id',productsControllers.deleteProducto)

module.exports={routerProducts};