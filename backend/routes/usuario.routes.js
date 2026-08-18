const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuario.controller");

const { verificarToken } = require("../middleware/auth.middleware");
const { verificarRol } = require("../middleware/rol.middleware");
//Admin ve a los usuarios
router.get(
    "/",
    verificarToken,
    verificarRol(2),
    usuarioController.obtenerUsuarios
);

router.post("/", usuarioController.crearUsuario);


module.exports = router;