import "../styles/perfil.css";
import { useNavigate } from "react-router-dom";

function Perfil() {

    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        navigate("/login");
    };

    if (!usuario) {
        return (
            <section className="perfil">
                <div className="perfil-card">
                    <h1>No has iniciado sesión 🐾</h1>

                    <button onClick={() => navigate("/login")}>
                        Iniciar sesión
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="perfil">

            <div className="perfil-card">

                <div className="perfil-icon">
                    👤
                </div>

                <h1>¡Hola, {usuario.nombre}! 🐾</h1>

                <p className="perfil-bienvenida">
                    Bienvenido/a nuevamente a Crunchy Clash
                </p>

                <div className="perfil-datos">

                    <h2>Mis datos</h2>

                    <p>
                        <strong>Nombre:</strong>{" "}
                        {usuario.nombre} {usuario.apellido}
                    </p>

                    <p>
                        <strong>Correo:</strong>{" "}
                        {usuario.correo}
                    </p>

                    <p>
                        <strong>Teléfono:</strong>{" "}
                        {usuario.telefono}
                    </p>

                    <p>
                        <strong>Dirección:</strong>{" "}
                        {usuario.direccion}
                    </p>

                </div>

                <div className="perfil-opciones">

                    <button
                        onClick={() => navigate("/mispedidos")}
                    >
                        📦 Mis pedidos
                    </button>

                    <button
                        onClick={() => navigate("/favoritos")}
                    >
                        ❤️ Mis favoritos
                    </button>

                </div>

                <button
                    className="cerrar-sesion"
                    onClick={cerrarSesion}
                >
                    🚪 Cerrar sesión
                </button>

            </div>

        </section>
    );
}

export default Perfil;