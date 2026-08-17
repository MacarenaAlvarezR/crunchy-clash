const express = require("express");
const router = express.Router();

const categoriaController = require("../controllers/categoria.controller");

router.get("/", categoriaController.obtenerCategorias);

router.post("/", categoriaController.crearCategoria);

module.exports = router;