const express = require('express');
const {Router} = require('express');
const {carritoControllers} = require('../Controllers/carritoControllers')

const routerCarrito = new Router

routerCarrito.use(express.json());
routerCarrito.use(express.urlencoded({extended:true}));

routerCarrito.get('/api/carritos',carritoControllers.getAllCarritos)
routerCarrito.get('/api/carritos/:id', carritoControllers.getOneCarrito)
routerCarrito.post('/api/createCarrito', carritoControllers.createCarrito)
routerCarrito.put('/api/updateCarrito/:id', carritoControllers.updateCarrito)
routerCarrito.delete('/api/deleteCarrito/:id', carritoControllers.deleteCarrito)

module.exports = {routerCarrito}