const express = require('express');
const {Router} = require('express');
const {brandsControllers} = require('../Controllers/brandsControllers');

const routerBrands = new Router();

routerBrands.use(express.json());
routerBrands.use(express.urlencoded({extended:true}));

routerBrands.get('/api/brands', brandsControllers.getAllBrands);
routerBrands.get('/api/brands/:id',brandsControllers.getOneBrand)
routerBrands.post('/api/createBrand', brandsControllers.createBrand)
routerBrands.put('/api/updateBrand/:id', brandsControllers.updateBrand)
routerBrands.delete('/api/deleteBrand/:id',brandsControllers.deleteBrand)

module.exports={routerBrands};