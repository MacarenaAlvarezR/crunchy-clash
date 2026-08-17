select * from rol;

select * from usuario;

select * from categoria;

SELECT * FROM producto;

SELECT * FROM rol;

SELECT 
u.nombre,
r.nombre AS rol
FROM usuario u
JOIN rol r
ON u.id_rol = r.id_rol;

SELECT 
p.nombre,
c.nombre AS categoria
FROM producto p
JOIN categoria c
ON p.id_categoria = c.id_categoria;

select * FROM pedido;

SELECT * FROM detalle_pedido;
\dt

SELECT * FROM pedido;

SELECT * FROM detalle_pedido;

SELECT nombre, stock FROM producto;

WHERE p.id_pedido = $1