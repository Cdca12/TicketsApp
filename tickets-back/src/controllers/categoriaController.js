const connection = require('../config/connection');


function listarCategorias(req, res) {
    if(connection) {
        let sql = "SELECT * FROM CATEGORIA";
        connection.query(sql, (err, categorias) => {
            if(err) {
                res.json(err);
            } else {
                console.log(categorias);
                res.json(categorias);
            }
        });
    }
}

function obtenerCategoria(req, res) {
    if(connection){
        const categoria_id = req.params.id; 
        let sql = `SELECT * FROM CATEGORIA WHERE categoria_id = ${connection.escape(categoria_id)}`;
        connection.query(sql, (err, categoria) => {
            if(err){
                console.log(err);
            } else {
                var mensaje1 = "";
                if(categoria === undefined || categoria.length == 0)
                mensaje1 = "Categoria no encontrada";
                res.json({data: categoria[0], mensaje: mensaje1});
            }
        })
    }

}

function crearCategoria(req, res){
    if(connection){
        console.log(req.body);
        const categoria = req.body;

        if(!categoria.categoria_nombre){
            return res.status(400).send({error: true, mensaje: "El nombre es obligatorio"});
        }

        if(categoria.categoria_nombre && categoria.categoria_nombre.length > 50){
            return res.status(400).send({error: true, mensaje: "La longitud debe ser máximo de 50 caracteres"});
        }

        let sql = "INSERT INTO CATEGORIA set ?";

        connection.query(sql, [categoria], (err, data) => {
            if(err){
                console.log(err);
            } else {
            
                res.json({error: false, data, mensaje: "Categoria creada con exito."});
            }
        })
    }
}

function eliminarCategoria(req, res) {
    if(connection) {
        const categoria_id = req.params.id; 
        let sql = "DELETE FROM CATEGORIA WHERE categoria_id = ?";
        connection.query(sql, [categoria_id], (err, data) => {
            if(err) {
                res.json(err);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0) {
                    mensaje = "Categoria no encontrada";
                } else {
                    mensaje = "Categoria eliminada con éxito";
                }

                res.json({error: false, data, mensaje});
            }
        })
    }
}

module.exports = {
    listarCategorias,
    obtenerCategoria,
    crearCategoria,
    eliminarCategoria
}