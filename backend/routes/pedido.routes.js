const express = require("express");
const router = express.Router();

const pedidoController = require("../controllers/pedido.controller");

const { verificarToken } = require("../middleware/auth.middleware");

const { verificarRol } = require("../middleware/rol.middleware");

// Crear pedido
router.post("/", verificarToken, pedidoController.crearPedido);


// Solo admin puede ver todos
router.get(
    "/",
    verificarToken,
    verificarRol(2),
    pedidoController.obtenerPedidos
);


// Cliente ve sus propios pedidos
router.get(
    "/mispedidos",
    verificarToken,
    pedidoController.obtenerMisPedidos
);

// Ver detalle de un pedido
router.get(
    "/:id",
    verificarToken,
    pedidoController.obtenerPedidoDetalle
);


// Solo admin cambia estados
router.put(
    "/:id/estado",
    verificarToken,
    verificarRol(2),
    pedidoController.actualizarEstadoPedido
);


module.exports = router;