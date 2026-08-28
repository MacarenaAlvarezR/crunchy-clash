const pool = require("../config/db");

const obtenerCoberturas = async (req, res) => {

    try {

        const resultado = await pool.query(
            `
            SELECT
                id_cobertura,
                nombre,
                descripcion,
                precio,
                imagen,
                activo
            FROM cobertura
            WHERE activo = true
            ORDER BY id_cobertura
            `
        );

        res.json(resultado.rows);

    } catch (error) {

        console.error(
            "Error obteniendo coberturas:",
            error
        );

        res.status(500).json({
            error: "Error al obtener coberturas"
        });

    }

};


module.exports = {
    obtenerCoberturas
};