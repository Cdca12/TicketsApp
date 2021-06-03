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