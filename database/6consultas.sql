select * from rol;

select * from usuario;

select * from categoria;

SELECT * FROM producto;

SELECT * FROM cobertura;

SELECT * FROM pedido;

SELECT * FROM detalle_pedido;

--mostrar usuario con rol
SELECT 
u.nombre,
u.apellido,
u.correo,
r.nombre AS rol
FROM usuario u
JOIN rol r
ON u.id_rol = r.id_rol;

--mostrar producto con categoria
SELECT 
p.nombre,
p.descripcion,
p.precio,
p.stock,
c.nombre AS categoria
FROM producto p
JOIN categoria c
ON p.id_categoria = c.id_categoria;

--consultar producto y stock
SELECT nombre, stock FROM producto;

--productos con stock min
SELECT 
nombre, 
stock, 
stock_minimo 
FROM producto 
WHERE stock <= stock_minimo;

--mostrar pedid con el usuario que lo realizo
SELECT 
p.id_pedido, 
p.fecha, 
p.estado, 
p.total, 
u.nombre, 
u.apellido 
FROM pedido p 
JOIN usuario u ON p.id_usuario = u.id_usuario;

--mostrar detalle de los pedidos

SELECT 
dp.id_detalle, 
dp.id_pedido, 
dp.id_producto, 
dp.cantidad, 
dp.precio_unitario, 
dp.descripcion 
FROM detalle_pedido dp 
ORDER BY dp.id_pedido;