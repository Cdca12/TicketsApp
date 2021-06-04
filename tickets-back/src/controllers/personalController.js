const connection = require("../config/connection");

function listarPersonal(req, res) {
	if (connection) {
		let sql = "SELECT * FROM PERSONAL";
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

function obtenerPersonal(req, res) {
	if (connection) {
		const personal_id = req.params.id;
		let sql = `SELECT * FROM PERSONAL WHERE personal_id = ${connection.escape(
			personal_id
		)}`;
		connection.query(sql, (err, personal) => {
			if (err) {
				console.log(err);
			} else {
				var mensaje1 = "";
				if (personal === undefined || personal.length == 0)
					mensaje1 = "Personal no encontrado";
				res.json({ data: personal[0], mensaje: mensaje1 });
			}
		});
	}
}

function crearPersonal(req, res) {
	if (connection) {
		console.log(req.body);
		const personal = req.body;
		// TODO: Cambiar de personal a persona
		if (!personal.personal_nombre) {
			return res
				.status(400)
				.send({ error: true, mensaje: "El nombre es obligatorio" });
		}
		if (!personal.personal_apellidos) {
			return res
				.status(400)
				.send({ error: true, mensaje: "El apellido es obligatorio" });
		}
		if (personal.personal_nombre && personal.personal_nombre.length > 50) {
			return res
				.status(400)
				.send({
					error: true,
					mensaje:
						"La longitud del nombre debe ser máximo de 50 caracteres",
				});
		}
		if (
			personal.personal_apellidos &&
			personal.personal_apellidos.length > 80
		) {
			return res
				.status(400)
				.send({
					error: true,
					mensaje:
						"La longitud del apellido debe ser máximo de 80 caracteres",
				});
		}
		if (
			personal.personal_telefono &&
			personal.personal_telefono.length !== 10
		) {
			return res
				.status(400)
				.send({
					error: true,
					mensaje:
						"La longitud del telefono debe ser de 10 caracteres",
				});
		}

		let sql = "INSERT INTO PERSONAL set ?";

		connection.query(sql, [personal], (err, data) => {
			if (err) {
				console.log(err);
			} else {
				res.json({
					error: false,
					data,
					mensaje: "Personal creado con exito.",
				});
			}
		});
	}
}

function editarPersonal(req, res) {
	if (connection) {
		const personal_id = req.params.id;
		const personal = req.body;

		if (!personal.personal_nombre) {
			return res
				.status(400)
				.send({ error: true, mensaje: "El nombre es obligatorio" });
		}
		if (!personal.personal_apellidos) {
			return res
				.status(400)
				.send({ error: true, mensaje: "El apellido es obligatorio" });
		}
		if (personal.personal_nombre && personal.personal_nombre.length > 50) {
			return res
				.status(400)
				.send({
					error: true,
					mensaje:
						"La longitud del nombre debe ser máximo de 50 caracteres",
				});
		}
		if (
			personal.personal_apellidos &&
			personal.personal_apellidos.length > 80
		) {
			return res
				.status(400)
				.send({
					error: true,
					mensaje:
						"La longitud del apellido debe ser máximo de 80 caracteres",
				});
		}
		if (
			personal.personal_telefono &&
			personal.personal_telefono.length !== 10
		) {
			return res
				.status(400)
				.send({
					error: true,
					mensaje:
						"La longitud del telefono debe ser de 10 caracteres",
				});
		}

		let sql = "UPDATE PERSONAL set ? WHERE personal_id = ?";

		connection.query(sql, [personal, personal_id], (err, data) => {
			if (err) {
				res.json(err);
			} else {
				let mensaje = "";
				if (data.changedRows === 0) {
					mensaje = "La información es la misma";
				} else {
					mensaje = "Se actualizaron los datos del personal correctamente"
				}


				res.json({ error: false, data, mensaje });
			}
		});
	}
}

function eliminarPersonal(req, res) {
	if (connection) {
		const personal_id = req.params.id;

		let sqltickets = `SELECT * FROM TICKET WHERE personal_id = ${connection.escape(personal_id)}`;
		connection.query(sqltickets, (err, ticket) => {
			if (err) {
				console.log(err);
			}
			if (ticket === undefined || ticket.length == 0) {
				let sql = "DELETE FROM PERSONAL WHERE personal_id = ?";
				connection.query(sql, [personal_id], (err, data) => {
					if (err) {
						res.json(err);
					} else {
						let mensaje = "";
						if (data.affectedRows === 0) {
							mensaje = "Personal no encontrado";
						} else {
							mensaje = "Personal eliminado con éxito";
						}

						res.json({ error: false, data, mensaje });
					}
				});
			} else {
				return res
					.status(400)
					.send({ error: true, mensaje: "El personal no puede ser eliminado" });
			}
		});
	}
}

module.exports = {
	listarPersonal,
	obtenerPersonal,
	crearPersonal,
	editarPersonal,
	eliminarPersonal,
};