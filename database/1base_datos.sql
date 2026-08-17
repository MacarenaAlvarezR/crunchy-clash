CREATE DATABASE crunchy_clash;


CREATE TABLE rol (

    id_rol SERIAL PRIMARY KEY,

    nombre VARCHAR(30) NOT NULL

);

select * from rol;

CREATE TABLE usuario (

    id_usuario SERIAL PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    apellido VARCHAR(100) NOT NULL,

    correo VARCHAR(100) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    telefono VARCHAR(20) NOT NULL,

    direccion TEXT NOT NULL,

    id_rol INTEGER NOT NULL,

    CONSTRAINT fk_usuario_rol
        FOREIGN KEY (id_rol)
        REFERENCES rol(id_rol)

);

select * from usuario;

CREATE TABLE categoria(

    id_categoria SERIAL PRIMARY KEY,

    nombre VARCHAR(50) NOT NULL

);
INSERT INTO categoria (nombre)
VALUES
('Banderillas'),
('Bebidas'),
('Extras');

select * from categoria;

CREATE TABLE producto (

    id_producto SERIAL PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    descripcion VARCHAR(255) NOT NULL,

    precio NUMERIC(10,2) NOT NULL,

    stock INTEGER NOT NULL,

    stock_minimo INTEGER NOT NULL,

    imagen VARCHAR(255) NOT NULL,

    activo BOOLEAN DEFAULT TRUE,

    personalizable BOOLEAN DEFAULT FALSE,

    id_categoria INTEGER NOT NULL,

    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (id_categoria)
        REFERENCES categoria(id_categoria)

);

SELECT * FROM producto;


