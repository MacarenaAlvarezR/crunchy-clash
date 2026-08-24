const pool = require("../config/db");
const bcrypt = require("bcrypt");

// Obtener usuarios
const obtenerUsuarios = async (req, res) => {

    try {

        const resultado = await pool.query(
            `SELECT 
                u.id_usuario,
                u.nombre,
                u.apellido,
                u.correo,
                u.telefono,
                u.direccion,
                u.id_rol,
                r.nombre AS rol
             FROM usuario u
             INNER JOIN rol r
             ON u.id_rol = r.id_rol
             ORDER BY u.id_usuario`
        );


        res.json(resultado.rows);


    } catch (error) {

        console.error("Error obteniendo usuarios:", error);

        res.status(500).json({
            error: "Error al obtener usuarios"
        });
    }
};



// Crear usuario
const crearUsuario = async (req, res) => {

    try {

        const {
            nombre,
            apellido,
            correo,
            password,
            telefono,
            direccion,
            id_rol
        } = req.body;


        const passwordEncriptada = await bcrypt.hash(password, 10);


        const resultado = await pool.query(
            `INSERT INTO usuario
            (
                nombre,
                apellido,
                correo,
                password,
                telefono,
                direccion,
                id_rol
            )
            VALUES($1,$2,$3,$4,$5,$6,$7)
            RETURNING *`,
            [
                nombre,
                apellido,
                correo,
                passwordEncriptada,
                telefono,
                direccion,
                id_rol
            ]
        );


        res.json(resultado.rows[0]);


    } catch (error) {

        console.error("Error creando usuario:", error);

        res.status(500).json({
            error: "Error al crear usuario"
        });
    }
};



module.exports = {
    obtenerUsuarios,
    crearUsuario
};