const express = require("express");
const router = express.Router();

const productoController = require("../controllers/producto.controller");

const { verificarToken } = require("../middleware/auth.middleware");

const { verificarRol } = require("../middleware/rol.middleware");


router.get("/", productoController.obtenerProductos);

router.post(
    "/",
    verificarToken,
    verificarRol(2),
    productoController.crearProducto
);

router.get("/categoria/:id_categoria", productoController.obtenerProductosPorCategoria);

router.get("/:id", productoController.obtenerProductoPorId);

router.put(
    "/:id",
    verificarToken,
    verificarRol(2),
    productoController.actualizarProducto
);

router.put(
    "/:id/desactivar",
    verificarToken,
    verificarRol(2),
    productoController.desactivarProducto
);
router.put(
    "/:id/activar",
    verificarToken,
    verificarRol(2),
    productoController.activarProducto
);

module.exports = router;