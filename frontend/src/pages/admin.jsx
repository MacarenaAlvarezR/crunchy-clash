import "../styles/admin.css";
import { useState } from "react";
import AdminProducts from "../components/AdminProducts";
import AdminOrders from "../components/AdminOrders";
import AdminUsers from "../components/AdminUsers";

function Admin() {

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );

    const [seccion, setSeccion] = useState("inicio");

    if (!usuario || usuario.id_rol !== 2) {
        return (
            <section className="admin">
                <h1>Acceso no autorizado</h1>
                <p>No tienes permisos para acceder al panel de administración.</p>
            </section>
        );
    }

    return (
        <section className="admin">

            <h1>Panel de Administración </h1>

            <p>
                Bienvenido, {usuario.nombre}
            </p>

            <div className="admin-opciones">

                <button onClick={() => setSeccion("productos")}>
                    📦 Productos
                </button>

                <button onClick={() => setSeccion("pedidos")}>
                    🛒 Pedidos
                </button>

                <button onClick={() => setSeccion("usuarios")}>
                    👥 Usuarios
                </button>

            </div>

 {seccion === "inicio" && (
                <div className="admin-bienvenida">

                    <h2>Bienvenido al panel</h2>

                    <p>
                        Selecciona una opción para comenzar
                        a administrar la tienda.
                    </p>

                </div>
            )}

            {seccion === "productos" && (
                <AdminProducts />
    
                
            )}
            

            {seccion === "pedidos" && (
                <AdminOrders />
            )}

            

            {seccion === "usuarios" && (
                <AdminUsers />
            )}




        </section>
    );
}

export default Admin;