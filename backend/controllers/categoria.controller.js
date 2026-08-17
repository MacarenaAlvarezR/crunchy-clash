const pool = require("../config/db");

const obtenerCategorias = async (req, res) => {
    try {
        const resultado = await pool.query("SELECT * FROM categoria ORDER BY id_categoria");
        res.json(resultado.rows);
    } catch (error) {
        console.error("Error obteniendo categorías:", error);
            res.status(500).json({
                error: "Error al obtener categorías"
        });
    }
};


// Crear categoría
const crearCategoria = async (req, res) => {

    try {

        const { nombre } = req.body;

        const resultado = await pool.query(
            "INSERT INTO categoria(nombre) VALUES($1) RETURNING *",
            [nombre]
        );

        res.json(resultado.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error creando categoría"
        });
    }
};

module.exports = {
    obtenerCategorias, crearCategoria
};