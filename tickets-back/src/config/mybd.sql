create database tickets;

use tickets;

create table CATEGORIA ( 
	categoria_id INT NOT NULL auto_increment,
    categoria_nombre varchar(50) NOT NULL,
    primary key(categoria_id)
);

create table PERSONAL ( 
	personal_id INT NOT NULL auto_increment,
    personal_nombre varchar(50) NOT NULL,
    personal_apellidos varchar(80) NOT NULL,
    personal_telefono varchar(10),
    personal_direccion varchar(150),
    primary key(personal_id)
);

create table TICKET ( 
	ticket_id INT NOT NULL auto_increment,
    ticket_nombre varchar(50) NOT NULL,
    ticket_descripcion varchar(100),
    ticket_prioridad varchar(1) NOT NULL,
    ticket_estatus varchar(3) NOT NULL,
    personal_id INT NOT NULL,
    categoria_id INT NOT NULL,
    primary key(ticket_id)
);

/*Foreign keys tickets*/
Alter table TICKET ADD Constraint fk_ticket_personal foreign key (personal_id) references PERSONAL(personal_id);
Alter table TICKET ADD Constraint fk_ticket_categoria foreign key (categoria_id) references CATEGORIA(categoria_id);

/*Default constraints*/
/*PERSONAL*/
ALTER TABLE PERSONAL ALTER personal_telefono SET DEFAULT '-';
ALTER TABLE PERSONAL ALTER personal_direccion SET DEFAULT 'Sin direccion';
/*TICKET*/
ALTER TABLE TICKET ALTER ticket_descripcion SET DEFAULT 'Sin descripcion';

/*Se crea la vista de tickets*/
CREATE VIEW vTicket AS
SELECT t.ticket_id, t.ticket_nombre, t.ticket_descripcion, t.ticket_prioridad, t.ticket_estatus, 
p.personal_id, p.personal_nombre, c.categoria_id, c.categoria_nombre
FROM ticket t
INNER JOIN personal p ON p.personal_id = t.personal_id
INNER JOIN categoria c ON c.categoria_id = t.categoria_id;

/*Insercion de categorias*/
INSERT INTO categoria (categoria_nombre) VALUES ('Incidencia');
INSERT INTO categoria (categoria_nombre) VALUES ('Consulta');

/*Insercion de personal*/
INSERT INTO personal (personal_nombre, personal_apellidos, personal_telefono, personal_direccion) VALUES ('Héctor', 'Sánchez Martínez', '6672321829', 'Calle 2');
INSERT INTO personal (personal_nombre, personal_apellidos, personal_telefono, personal_direccion) VALUES ('María', 'Pérez Camacho', '6674329120', 'Calle Londres');

/*Insercion de tickets*/
INSERT INTO ticket (ticket_nombre, ticket_descripcion, ticket_prioridad, ticket_estatus, personal_id, categoria_id) VALUES ('Incidencia con la base de datos', 'La base de datos se cayó', '1', 'ABT', 1, 1);
INSERT INTO ticket (ticket_nombre, ticket_descripcion, ticket_prioridad, ticket_estatus, personal_id, categoria_id) VALUES ('Problema de red', 'Un dispositivo sin conexión', '2', 'ESP', 1, 1);
INSERT INTO ticket (ticket_nombre, ticket_descripcion, ticket_prioridad, ticket_estatus, personal_id, categoria_id) VALUES ('Dudas sobre el sistema', 'Se necesitan respuestas sobre el funcionamiento del nuevo sistema', '3', 'FIN', 2, 2);