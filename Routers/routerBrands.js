const express = require('express');
const {Router} = require('express');
const {brandsControllers} = require('../Controllers/brandsControllers');

const routerBrands = new Router();

routerBrands.use(express.json());
routerBrands.use(express.urlencoded({extended:true}));

routerBrands.get('/api/brands', brandsControllers.getAllBrands);

module.exports={routerBrands};