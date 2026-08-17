require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const categoriaRoutes = require("./routes/categoria.routes");
const productoRoutes = require("./routes/producto.routes");
const usuarioRoutes = require("./routes/usuario.routes");
const authRoutes = require("./routes/auth.routes");
const pedidoRoutes = require("./routes/pedido.routes");


const app = express();
const PORT = 3000;

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


// Iniciar servidor
app.listen(PORT, () => {
    console.log("--------------------------------");
    console.log("🚀 Servidor iniciado correctamente");
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("📦 API categorías: /api/categorias");
    console.log("🍢 API productos: /api/productos");
    console.log("👤 API usuarios: /api/usuarios");
    console.log("❤️ Health check: /api/health");
    console.log("--------------------------------");
});


// Verificar conexión al arrancar
pool.connect()
    .then(client => {
        console.log("✅ PostgreSQL conectado correctamente");
        client.release();
    })
    .catch(error => {
        console.error("❌ PostgreSQL desconectado:", error.message);
    });