import "../styles/login.css"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [iniciando, setIniciando] = useState(false);
    
    const iniciarSesion = async (e) => {
        e.preventDefault();

        setMensaje("");
        setError("");
        setIniciando(true);
        try {

            const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    correo,
                    password
                })
            });
            const datos = await respuesta.json();

            if (!respuesta.ok) {
                setError(datos.error || "Error al iniciar sesión");
                setIniciando(false);
                return;
            }
            localStorage.setItem("token", datos.token);
            localStorage.setItem("usuario", JSON.stringify(datos.usuario));

            setMensaje("¡Inicio de sesión exitoso! 🎉");

            setTimeout(() => {
                navigate("/perfil");
            }, 1000);

        } catch (error) {

            console.error(error);

            setError(
                "No se pudo conectar con el servidor."
            );

            setIniciando(false);
        }
    };

    return (
        <section className="login">

            <div className="login-card">

                <h1>Iniciar sesión</h1>

                <p>
                    Ingresa a tu cuenta de Crunchy Clash 🐾
                </p>

                <form onSubmit={iniciarSesion}>
                    <label>
                        Correo
                    </label>

                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        placeholder="correo@ejemplo.com"
                        required
                    />

                    <label>
                        Contraseña
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        required
                    />

                    <button type="submit" disabled={iniciando} > {iniciando ? "Iniciando..." : "Iniciar sesión"} </button>

                </form>
                {mensaje && (
                    <p className="mensaje-exito">
                        {mensaje}
                    </p>
                )}

                {error && (
                    <p className="mensaje-error">
                        {error}
                    </p>
                )}

                <p>
                    ¿No tienes una cuenta?
                </p>
                <Link to="/registro">
                    Registrarse
                </Link>

            </div>

        </section>
    );
}

export default Login;