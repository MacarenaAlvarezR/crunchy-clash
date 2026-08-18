require("dotenv").config();

const express = require("express");
const cors = require("cors");

const categoriaRoutes = require("./routes/categoria.routes");
const productoRoutes = require("./routes/producto.routes");
const usuarioRoutes = require("./routes/usuario.routes");
const authRoutes = require("./routes/auth.routes");
const pedidoRoutes = require("./routes/pedido.routes");

const pool = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta principal de prueba
app.get("/", (req, res) => {
    res.json({
        estado: "OK",
        mensaje: "API Tienda Asiática funcionando 🚀"
    });
});

// Ruta de salud del sistema
app.get("/api/health", async (req, res) => {
    try {
        await pool.query("SELECT NOW()");

        res.json({
            servidor: "activo",
            database: "conectada",
            fecha: new Date()
        });

    } catch (error) {
        res.status(500).json({
            servidor: "activo",
            database: "error",
            mensaje: error.message
        });
    }
});

// Rutas API
app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api", authRoutes);
app.use("/api/pedidos", pedidoRoutes);

module.exports = app;