const express = require("express");

const routes = express.Router();

const {
	listarTickets,
	obtenerTicket,
	crearTicket,
	editarTicket,
	eliminarTicket,
	obtenerTicketCategoria,
} = require("../controllers/ticketController");

routes.get("/ticket", listarTickets);

routes.get("/ticket/:id", obtenerTicket);

routes.get("/ticketCategoria/:id", obtenerTicketCategoria);

routes.post("/ticket", crearTicket);

routes.put("/ticket/:id", editarTicket);

routes.delete("/ticket/:id", eliminarTicket);

module.exports = routes;
