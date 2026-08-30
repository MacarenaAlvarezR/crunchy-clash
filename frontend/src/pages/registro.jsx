import "../styles/registro.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Registro() {

    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const registrarUsuario = async (e) => {

        e.preventDefault();

        setMensaje("");
        setError("");

        try {

            const respuesta = await fetch(
                `${import.meta.env.VITE_API_URL}/api/usuarios/registro`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        nombre,
                        apellido,
                        correo,
                        password,
                        telefono,
                        direccion,
                        
                    })
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {

                setError(
                    datos.error || "Error al crear la cuenta"
                );

                return;
            }

            setMensaje(
                "¡Cuenta creada correctamente! 🎉"
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            console.error(error);

            setError(
                "No se pudo conectar con el servidor."
            );
        }
    };


    return (

        <section className="registro">

            <div className="registro-card">

                <h1>Crear cuenta</h1>

                <p>
                    Regístrate en Crunchy Clash 🐾
                </p>


                <form onSubmit={registrarUsuario}>

                    <label>
                        Nombre
                    </label>

                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) =>
                            setNombre(e.target.value)
                        }
                        placeholder="Tu nombre"
                        required
                    />


                    <label>
                        Apellido
                    </label>

                    <input
                        type="text"
                        value={apellido}
                        onChange={(e) =>
                            setApellido(e.target.value)
                        }
                        placeholder="Tu apellido"
                        required
                    />


                    <label>
                        Correo
                    </label>

                    <input
                        type="email"
                        value={correo}
                        onChange={(e) =>
                            setCorreo(e.target.value)
                        }
                        placeholder="correo@ejemplo.com"
                        required
                    />


                    <label>
                        Contraseña
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="********"
                        required
                    />


                    <label>
                        Teléfono
                    </label>

                    <input
                        type="tel"
                        value={telefono}
                        onChange={(e) =>
                            setTelefono(e.target.value)
                        }
                        placeholder="+56 9 1234 5678"
                        required
                    />


                    <label>
                        Dirección
                    </label>

                    <input
                        type="text"
                        value={direccion}
                        onChange={(e) =>
                            setDireccion(e.target.value)
                        }
                        placeholder="Tu dirección"
                        required
                    />


                    <button type="submit">
                        Registrarse
                    </button>

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


                <p className="registro-login">
                    ¿Ya tienes una cuenta?
                </p>

                <Link to="/login">
                    Iniciar sesión
                </Link>

            </div>

        </section>
    );
}

export default Registro;