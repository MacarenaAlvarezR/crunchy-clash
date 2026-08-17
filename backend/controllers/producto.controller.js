const pool = require("../config/db");


// Obtener productos
const obtenerProductos = async (req, res) => {
    try {

        const resultado = await pool.query(
            `SELECT 
                p.id_producto,
                p.nombre,
                p.descripcion,
                p.precio,
                p.stock,
                p.stock_minimo,
                p.imagen,
                p.activo,
                p.personalizable,
                c.nombre AS categoria
             FROM producto p
             INNER JOIN categoria c
             ON p.id_categoria = c.id_categoria
             ORDER BY p.id_producto`
        );

        res.json(resultado.rows);

    } catch (error) {

        console.error("Error obteniendo productos:", error);

        res.status(500).json({
            error: "Error al obtener productos"
        });
    }
};


// Crear producto
const crearProducto = async (req, res) => {

    try {

        const {
            nombre,
            descripcion,
            precio,
            stock,
            stock_minimo,
            imagen,
            personalizable,
            id_categoria
        } = req.body;


        const resultado = await pool.query(
            `INSERT INTO producto
            (
                nombre,
                descripcion,
                precio,
                stock,
                stock_minimo,
                imagen,
                personalizable,
                id_categoria
            )
            VALUES($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *`,
            [
                nombre,
                descripcion,
                precio,
                stock,
                stock_minimo,
                imagen,
                personalizable,
                id_categoria
            ]
        );


        res.json(resultado.rows[0]);


    } catch (error) {

        console.error("Error creando producto:", error);

        res.status(500).json({
            error: error.message
        });
    }
};

const obtenerProductosPorCategoria = async (req, res) => {
    try {

        const { id_categoria } = req.params;

        const resultado = await pool.query(
            `SELECT 
                p.id_producto,
                p.nombre,
                p.descripcion,
                p.precio,
                p.stock,
                p.imagen,
                p.activo,
                p.personalizable,
                c.nombre AS categoria
             FROM producto p
             INNER JOIN categoria c
             ON p.id_categoria = c.id_categoria
             WHERE p.id_categoria = $1
             ORDER BY p.id_producto`,
            [id_categoria]
        );

        res.json(resultado.rows);

    } catch (error) {

        console.error("Error buscando productos por categoría:", error);

        res.status(500).json({
            error: "Error al buscar productos por categoría"
        });
    }
};

const obtenerProductoPorId = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            `SELECT 
                p.id_producto,
                p.nombre,
                p.descripcion,
                p.precio,
                p.stock,
                p.stock_minimo,
                p.imagen,
                p.activo,
                p.personalizable,
                c.nombre AS categoria
             FROM producto p
             INNER JOIN categoria c
             ON p.id_categoria = c.id_categoria
             WHERE p.id_producto = $1`,
            [id]
        );


        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }


        res.json(resultado.rows[0]);


    } catch (error) {

        console.error("Error obteniendo producto:", error);

        res.status(500).json({
            error: "Error al obtener producto"
        });
    }
};

const actualizarProducto = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nombre,
            descripcion,
            precio,
            stock,
            stock_minimo,
            imagen,
            activo,
            personalizable,
            id_categoria
        } = req.body;


        const resultado = await pool.query(
            `UPDATE producto
             SET 
                nombre = $1,
                descripcion = $2,
                precio = $3,
                stock = $4,
                stock_minimo = $5,
                imagen = $6,
                activo = $7,
                personalizable = $8,
                id_categoria = $9
             WHERE id_producto = $10
             RETURNING *`,
            [
                nombre,
                descripcion,
                precio,
                stock,
                stock_minimo,
                imagen,
                activo,
                personalizable,
                id_categoria,
                id
            ]
        );


        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }


        res.json(resultado.rows[0]);


    } catch (error) {

        console.error("Error actualizando producto:", error);

        res.status(500).json({
            error: "Error al actualizar producto"
        });
    }
};

// Desactivar producto
const desactivarProducto = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            `UPDATE producto
             SET activo = false
             WHERE id_producto = $1
             RETURNING *`,
            [id]
        );


        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }


        res.json({
            mensaje: "Producto desactivado correctamente",
            producto: resultado.rows[0]
        });


    } catch (error) {

        console.error("Error desactivando producto:", error);

        res.status(500).json({
            error: "Error al desactivar producto"
        });
    }
};



// Activar producto
const activarProducto = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            `UPDATE producto
             SET activo = true
             WHERE id_producto = $1
             RETURNING *`,
            [id]
        );


        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }


        res.json({
            mensaje: "Producto activado correctamente",
            producto: resultado.rows[0]
        });


    } catch (error) {

        console.error("Error activando producto:", error);

        res.status(500).json({
            error: "Error al activar producto"
        });
    }
};


module.exports = {
    obtenerProductos,
    crearProducto, obtenerProductosPorCategoria, obtenerProductoPorId, actualizarProducto, desactivarProducto, activarProducto
};