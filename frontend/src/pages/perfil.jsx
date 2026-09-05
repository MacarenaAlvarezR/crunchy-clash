import "../styles/perfil.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Perfil() {

    const navigate = useNavigate();

    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

    const [usuario, setUsuario] = useState(usuarioGuardado);
    const [subiendoFoto, setSubiendoFoto] = useState(false);
    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        navigate("/login");
    };


    const cambiarFoto = async (e) => {

        const archivo = e.target.files[0];

        if (!archivo) {
            return;
        }

        setSubiendoFoto(true);

        try {

            const formData = new FormData();

            formData.append("file", archivo);
            formData.append(
                "upload_preset",
                "crunchy_clash_perfil"
            );

            const respuestaCloudinary = await fetch(
                "https://api.cloudinary.com/v1_1/wjgezglc/image/upload",
                {
                    method: "POST",
                    body: formData
                }
            );

            const datosCloudinary =
                await respuestaCloudinary.json();

            if (!respuestaCloudinary.ok) {
                throw new Error(
                    datosCloudinary.error?.message ||
                    "Error al subir la imagen"
                );
            }

            const fotoUrl = datosCloudinary.secure_url;

            const token = localStorage.getItem("token");

            const respuestaBackend = await fetch(
                `${import.meta.env.VITE_API_URL}/api/usuarios/foto`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        foto_url: fotoUrl
                    })
                }
            );

            const datosBackend =
                await respuestaBackend.json();

            if (!respuestaBackend.ok) {
                throw new Error(
                    datosBackend.error ||
                    "No se pudo guardar la foto"
                );
            }

            const usuarioActualizado =
                datosBackend.usuario;

            localStorage.setItem(
                "usuario",
                JSON.stringify(usuarioActualizado)
            );

            setUsuario(usuarioActualizado);

        } catch (error) {

            console.error(
                "Error cambiando foto:",
                error
            );

            alert(
                "No se pudo actualizar la foto de perfil."
            );

        } finally {

            setSubiendoFoto(false);
        }
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

                    {usuario.foto_url ? (
                        <img
                            src={usuario.foto_url}
                            alt="Foto de perfil"
                        />
                    ) : (
                        "👤"
                    )}

                </div>
                <label className="cambiar-foto">

                    {subiendoFoto
                        ? "Subiendo foto..."
                        : "📷 Cambiar foto"}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={cambiarFoto}
                        disabled={subiendoFoto}
                    />

                </label>



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