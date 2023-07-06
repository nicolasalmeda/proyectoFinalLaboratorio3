const express = require('express');
const {Router} = require('express');

const {pedidosControllers} = require('../Controllers/pedidosControllers')

const routerPedidos = new Router

routerPedidos.use(express.json());
routerPedidos.use(express.urlencoded({extended:true}));

routerPedidos.get('/api/pedidos', pedidosControllers.getAllPedidos)
routerPedidos.get('/api/pedidos/:id',pedidosControllers.getOnePedido)
routerPedidos.get('/api/pedidosInfo', pedidosControllers.getAllPedidosInf)
routerPedidos.post('/api/createPedidos', pedidosControllers.createPedido)
routerPedidos.put('/api/updatePedidos/:id',pedidosControllers.updatePedidos)
routerPedidos.delete('/api/deletePedidos/:id',pedidosControllers.deletePedidos)
module.exports = {routerPedidos}