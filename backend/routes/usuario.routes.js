const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuario.controller");

const { verificarToken } = require("../middleware/auth.middleware");
const { verificarRol } = require("../middleware/rol.middleware");

//registro publico clientes
router.post("/registro", usuarioController.registrarUsuario);

//Admin ve a los usuarios
router.get(
    "/",
    verificarToken,
    verificarRol(2),
    usuarioController.obtenerUsuarios
);
//admin crea usuario
router.post("/",
    verificarToken,
    verificarRol(2),
    usuarioController.crearUsuario);

//usuario actualiza su foto de perfil
router.put(
    "/foto",
    verificarToken,
    usuarioController.actualizarFotoPerfil
);

module.exports = router;