const connection = require("../config/connection");

function listarTickets(req, res) {
	if (connection) {
		let sql = "SELECT * FROM vTicket ORDER BY ticket_id";
		connection.query(sql, (err, personal) => {
			if (err) {
				res.json(err);
			} else {
				console.log(personal);
				res.json(personal);
			}
		});
	}
}

function obtenerTicket(req, res) {
	if (connection) {
		const ticket_id = req.params.id;
		let sql = `SELECT * FROM TICKET WHERE ticket_id = ${connection.escape(
			ticket_id
		)}`;
		connection.query(sql, (err, ticket) => {
			if (err) {
				console.log(err);
			} else {
				var mensaje1 = "";
				if (ticket === undefined || ticket.length == 0)
					mensaje1 = "Ticket no encontrado";
				res.json({ data: ticket[0], mensaje: mensaje1 });
			}
		});
	}
}

function obtenerTicketCategoria(req, res) {
	if (connection) {
		const categoria_id = req.params.id;
		let sql = `SELECT * FROM vTicket WHERE categoria_id = ? ORDER BY ticket_id`;
		connection.query(sql, [categoria_id], (err, ticket) => {
			if (err) {
				console.log(err);
			} else {
				var mensaje1 = "";
				if (ticket === undefined || ticket.length == 0)
					mensaje1 = "Categoría no encontrada";
				res.json({ data: ticket, mensaje: mensaje1 });
			}
		});
	}
}

function crearTicket(req, res) {
	if (connection) {
		console.log(req.body);
		const ticket = req.body;

		if (!ticket.ticket_nombre) {
			return res
				.status(400)
				.send({ error: true, mensaje: "El nombre es obligatorio" });
		}
		if (!ticket.ticket_prioridad) {
			return res
				.status(400)
				.send({ error: true, mensaje: "La prioridad es obligatoria" });
		}
		if (!ticket.personal_id) {
			return res
				.status(400)
				.send({ error: true, mensaje: "El personal es obligatorio" });
		}
		if (!ticket.categoria_id) {
			return res
				.status(400)
				.send({ error: true, mensaje: "La categoria es obligatoria" });
		}
		if (ticket.ticket_nombre && ticket.ticket_nombre.length > 50) {
			return res.status(400).send({
				error: true,
				mensaje:
					"La longitud del nombre debe ser máximo de 50 caracteres",
			});
		}
		if (
			ticket.ticket_descripcion &&
			ticket.ticket_descripcion.length > 100
		) {
			return res.status(400).send({
				error: true,
				mensaje:
					"La longitud de la descripción debe ser máximo de 100 caracteres",
			});
		}

		let sqlpersonal = `SELECT * FROM PERSONAL WHERE personal_id = ${connection.escape(
			ticket.personal_id
		)}`;
		let sqlcategoria = `SELECT * FROM CATEGORIA WHERE categoria_id = ${connection.escape(
			ticket.categoria_id
		)}`;
		connection.query(sqlpersonal, (err, personal) => {
			if (err) {
				console.log(err);
			}
			if (personal === undefined || personal.length == 0) {
				return res
					.status(400)
					.send({ error: true, mensaje: "El personal no existe" });
			} else {
				connection.query(sqlcategoria, (err, categoria) => {
					if (err) {
						console.log(err);
					}
					if (categoria === undefined || categoria.length == 0) {
						return res.status(400).send({
							error: true,
							mensaje: "La categoria no existe",
						});
					} else {
						let sql = "INSERT INTO TICKET set ?";

						connection.query(sql, [ticket], (err, data) => {
							if (err) {
								console.log(err);
							} else {
								res.json({
									error: false,
									data,
									mensaje: "Ticket creado con exito.",
								});
							}
						});
					}
				});
			}
		});

		/* let sqlcategoria = `SELECT * FROM CATEGORIA WHERE categoria_id = ${connection.escape(ticket.categoria_id)}`;
        connection.query(sqlcategoria, (err, categoria) => {
            if(err){
                console.log(err);
            } 
            if(categoria === undefined || categoria.length == 0){
                this.banderacategoria = true;
            }
        })

        if(banderacategoria){
            return res.status(400).send({error: true, mensaje: "La categoria no existe"});
        } */

		/* let sql = "INSERT INTO TICKET set ?";

        connection.query(sql, [ticket], (err, data) => {
            if(err){
                console.log(err);
            } else {
                res.json({error: false, data, mensaje: "Ticket creado con exito."});
            }
        }) */
	}
}

function editarTicket(req, res) {
	if (connection) {
		const ticket_id = req.params.id;
		const ticket = req.body;

		if (!ticket.ticket_nombre) {
			return res
				.status(400)
				.send({ error: true, mensaje: "El nombre es obligatorio" });
		}
		if (!ticket.ticket_prioridad) {
			return res
				.status(400)
				.send({ error: true, mensaje: "La prioridad es obligatoria" });
		}
		if (!ticket.personal_id) {
			return res
				.status(400)
				.send({ error: true, mensaje: "El personal es obligatorio" });
		}
		if (!ticket.categoria_id) {
			return res
				.status(400)
				.send({ error: true, mensaje: "La categoria es obligatoria" });
		}
		if (ticket.ticket_nombre && ticket.ticket_nombre.length > 50) {
			return res.status(400).send({
				error: true,
				mensaje:
					"La longitud del nombre debe ser máximo de 50 caracteres",
			});
		}
		if (
			ticket.ticket_descripcion &&
			ticket.ticket_descripcion.length > 100
		) {
			return res.status(400).send({
				error: true,
				mensaje:
					"La longitud de la descripción debe ser máximo de 100 caracteres",
			});
		}

		let sqlpersonal = `SELECT * FROM PERSONAL WHERE personal_id = ${connection.escape(
			ticket.personal_id
		)}`;
		let sqlcategoria = `SELECT * FROM CATEGORIA WHERE categoria_id = ${connection.escape(
			ticket.categoria_id
		)}`;
		connection.query(sqlpersonal, (err, personal) => {
			if (err) {
				console.log(err);
			}
			if (personal === undefined || personal.length == 0) {
				return res
					.status(400)
					.send({ error: true, mensaje: "El personal no existe" });
			} else {
				connection.query(sqlcategoria, (err, categoria) => {
					if (err) {
						console.log(err);
					}
					if (categoria === undefined || categoria.length == 0) {
						return res.status(400).send({
							error: true,
							mensaje: "La categoria no existe",
						});
					} else {
						let sql = "UPDATE TICKET set ? WHERE ticket_id = ?";

						connection.query(
							sql,
							[ticket, ticket_id],
							(err, data) => {
								if (err) {
									res.json(err);
								} else {
									let mensaje = "";
									if (data.changedRows === 0) {
										mensaje = "La información es la misma";
									}else {
										mensaje = "Se actualizaron los datos del ticket correctamente"
									}

									res.json({ error: false, data, mensaje });
								}
							}
						);
					}
				});
			}
		});

		/* let sql = "UPDATE TICKET set ? WHERE ticket_id = ?";

        connection.query(sql, [ticket, ticket_id], (err, data) => {
            if (err) {
                res.json(err);
            } else {
                let mensaje = "";
                if (data.changedRows === 0) {
                    mensaje = "La información es la misma"
                }

                res.json({ error: false, data, mensaje });
            }
        }) */
	}
}

function eliminarTicket(req, res) {
	if (connection) {
		const ticket_id = req.params.id;
		let sql = "DELETE FROM TICKET WHERE ticket_id = ?";
		connection.query(sql, [ticket_id], (err, data) => {
			if (err) {
				res.json(err);
			} else {
				let mensaje = "";
				if (data.affectedRows === 0) {
					mensaje = "Ticket no encontrado";
				} else {
					mensaje = "Ticket eliminado con éxito";
				}

				res.json({ error: false, data, mensaje });
			}
		});
	}
}

module.exports = {
	listarTickets,
	obtenerTicket,
	obtenerTicketCategoria,
	crearTicket,
	editarTicket,
	eliminarTicket,
};
