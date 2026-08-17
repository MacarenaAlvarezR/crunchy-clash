const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Login de usuario
const login = async (req, res) => {

    try {

        const { correo, password } = req.body;


        
        const resultado = await pool.query(
            "SELECT * FROM usuario WHERE correo = $1",
            [correo]
        );


        if (resultado.rows.length === 0) {

            return res.status(404).json({
                error: "Usuario no encontrado"
            });

        }


        const usuario = resultado.rows[0];


        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password
        );


        if (!passwordCorrecta) {

            return res.status(401).json({
                error: "Contraseña incorrecta"
            });

        }


        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                correo: usuario.correo,
                id_rol: usuario.id_rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );



        res.json({
            mensaje: "Login correcto",
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                correo: usuario.correo,
                telefono: usuario.telefono,
                direccion: usuario.direccion,
                id_rol: usuario.id_rol
            }
        });




    } catch (error) {

        console.error("Error en login:", error);

        res.status(500).json({
            error: "Error en el login"
        });

    }

};


module.exports = {
    login
};