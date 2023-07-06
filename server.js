const express = require('express');
const app = express();
const {routerBrands} = require('./Routers/routerBrands')
const {routerProducts} = require('./Routers/routerProducts');
const { routerUsuario } = require('./Routers/routerUsuario');
const {routerCarrito} = require('./Routers/routerCarrito');
const {routerPedidos} = require('./Routers/routerPedidos');
app.use(express.json());



app.use(routerBrands);
app.use(routerProducts);
app.use(routerUsuario);
app.use(routerCarrito);
app.use(routerPedidos);



const PORT = 3001;
app.listen(PORT, () => console.log('Servidor escuchando en el puerto: ',PORT))