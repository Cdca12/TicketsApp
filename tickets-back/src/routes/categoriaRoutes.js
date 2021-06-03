const express = require('express');

const routes = express.Router();

const {listarCategorias , obtenerCategoria, crearCategoria, eliminarCategoria} = require('../controllers/categoriaController');

routes.get('/categoria', listarCategorias);

routes.get('/categoria/:id', obtenerCategoria);

routes.post('/categoria', crearCategoria);

routes.delete('/categoria/:id', eliminarCategoria);

module.exports = routes;