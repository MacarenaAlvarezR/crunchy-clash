

--tabla rol
CREATE TABLE rol (

    id_rol SERIAL PRIMARY KEY,

    nombre VARCHAR(30) NOT NULL

);

--tabla usuario
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

--tabla categoria

CREATE TABLE categoria(

    id_categoria SERIAL PRIMARY KEY,

    nombre VARCHAR(50) NOT NULL

);


--tabla producto

CREATE TABLE producto (

    id_producto SERIAL PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    descripcion VARCHAR(255) NOT NULL,

    precio NUMERIC(10,2) NOT NULL,

    stock INTEGER NOT NULL,

    stock_minimo INTEGER NOT NULL,

    imagen TEXT NOT NULL,

    activo BOOLEAN DEFAULT TRUE,

    personalizable BOOLEAN DEFAULT FALSE,

    id_categoria INTEGER NOT NULL,

    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (id_categoria)
        REFERENCES categoria(id_categoria)

);

--tabla cobertura

CREATE TABLE cobertura (
    id_cobertura SERIAL PRIMARY KEY, nombre VARCHAR(100) NOT NULL, descripcion VARCHAR(255) NOT NULL, 
    precio NUMERIC(10,2) NOT NULL, imagen TEXT NOT NULL, 
    activo BOOLEAN DEFAULT TRUE 
);

--tabla pedido

CREATE TABLE pedido (
    id_pedido SERIAL PRIMARY KEY, id_usuario INTEGER NOT NULL, fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    estado VARCHAR(30) DEFAULT 'pendiente', 
    total NUMERIC(10,2) DEFAULT 0, CONSTRAINT fk_pedido_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) 
    );

--tabla detalle_pedido

CREATE TABLE detalle_pedido ( id_detalle SERIAL PRIMARY KEY, id_pedido INTEGER NOT NULL, id_producto INTEGER, 
cantidad INTEGER NOT NULL, precio_unitario NUMERIC(10,2) NOT NULL, 
descripcion VARCHAR(255), 

CONSTRAINT fk_detalle_pedido FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido), 

CONSTRAINT fk_detalle_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto) 
);

