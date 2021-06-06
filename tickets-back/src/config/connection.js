const mysql = require('mysql');

const objectConnection = {
    "host": "localhost",
    "port": "3306",
    "user": "root",
    "password": "12345",
    "database": "tickets"
}

//Crear conexion
const myConn = mysql.createConnection(objectConnection);

//Conectar
myConn.connect((error) => {
    if(error){
        console.log("Error bd: ", error);
    } else {
        console.log("Bd conectada");
    }
});

module.exports = myConn;