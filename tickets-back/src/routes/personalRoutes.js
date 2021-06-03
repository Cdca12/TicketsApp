const express = require('express');

const routes = express.Router();

const {listarPersonal , obtenerPersonal, crearPersonal, editarPersonal, eliminarPersonal} = require('../controllers/personalController');

routes.get('/personal', listarPersonal);

routes.get('/personal/:id', obtenerPersonal);

routes.post('/personal', crearPersonal);

routes.put('/personal/:id', editarPersonal);

routes.delete('/personal/:id', eliminarPersonal);

module.exports = routes;