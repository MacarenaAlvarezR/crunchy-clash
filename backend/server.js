const app = require("./app")
const pool = require("./config/db");


const PORT = 3000;

  

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