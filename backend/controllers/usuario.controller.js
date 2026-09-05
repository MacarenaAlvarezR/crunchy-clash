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

//registro publico de clientes 

const registrarUsuario = async (req, res) => {
    try {
        const {
            nombre,
            apellido,
            correo,
            password,
            telefono,
            direccion
        } = req.body;
        const passwordEncriptada = await bcrypt.hash(password, 10);
        
        const resultado = await pool.query(
            `INSERT INTO usuario ( nombre, apellido, correo, password, telefono, direccion, id_rol ) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id_usuario, nombre, apellido, correo, telefono, direccion, id_rol`,
            [nombre,
                apellido,
                correo,
                passwordEncriptada,
                telefono,
                direccion, 1
            ]);
        
        res.status(201).json(resultado.rows[0]);

    } catch (error) {
        console.error("Error registrando usuario:", error);
        
        res.status(500).json({ error: "Error al registrar usuario" });
    }
};

//actualizacion foto de perfil
const actualizarFotoPerfil = async (req, res) => {

    try {

        const { foto_url } = req.body;
        const id_usuario = req.usuario.id_usuario;

        if (!foto_url) {
            return res.status(400).json({
                error: "La URL de la foto es obligatoria"
            });
        }

        const resultado = await pool.query(
            `UPDATE usuario
             SET foto_url = $1
             WHERE id_usuario = $2
             RETURNING
                id_usuario,
                nombre,
                apellido,
                correo,
                telefono,
                direccion,
                id_rol,
                foto_url`,
            [foto_url, id_usuario]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }

        res.json({
            mensaje: "Foto de perfil actualizada correctamente",
            usuario: resultado.rows[0]
        });

    } catch (error) {

        console.error("Error actualizando foto de perfil:", error);

        res.status(500).json({
            error: "Error al actualizar la foto de perfil"
        });
    }
};


module.exports = {
    obtenerUsuarios,
    crearUsuario,
    registrarUsuario, actualizarFotoPerfil
};