import React, { useEffect, useState } from "react";

function AdminUsers() {

    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [usuarioDetalle, setUsuarioDetalle] = useState(null);

    const [pedidosUsuario, setPedidosUsuario] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [guardando, setGuardando] = useState(false);

    const [nuevoAdmin, setNuevoAdmin] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        password: "",
        telefono: "",
        direccion: ""
    });


    useEffect(() => {

        const obtenerUsuarios = async () => {

            try {

                const respuesta = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/usuarios`,
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                if (!respuesta.ok) {
                    throw new Error("No se pudieron obtener los usuarios");
                }

                const datos = await respuesta.json();


                setUsuarios(datos);

            } catch (error) {

                console.error(error);

                setError(
                    "No se pudieron cargar los usuarios."
                );

            } finally {

                setCargando(false);

            }

        };

        obtenerUsuarios();

    }, []);


    const verDetalle = async (usuario) => {

        if (
            usuarioDetalle &&
            usuarioDetalle.id_usuario === usuario.id_usuario
        ) {
            setUsuarioDetalle(null);
            setPedidosUsuario([])
            return;
        }

        try {

            const respuesta = await fetch(
                `${import.meta.env.VITE_API_URL}/api/pedidos/usuario/${usuario.id_usuario}`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (!respuesta.ok) {
                throw new Error("No se pudieron obtener los pedidos");
            }

            const datos = await respuesta.json();

            setUsuarioDetalle(usuario);
            setPedidosUsuario(datos);

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    };


    

    const obtenerRol = (idRol) => {

        if (Number(idRol) === 2) {
            return "Administrador";
        }

        return "Cliente";

    };

    const manejarCambio = (e) => {

        setNuevoAdmin({
            ...nuevoAdmin,
            [e.target.name]: e.target.value
        });

    };

    const crearAdministrador = async (e) => {

        e.preventDefault();

        setGuardando(true);

        try {

            const respuesta = await fetch(
                `${import.meta.env.VITE_API_URL}/api/usuarios`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        ...nuevoAdmin,
                        id_rol: 2
                    })
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {

                throw new Error(
                    datos.error || "No se pudo crear el administrador"
                );

            }

            setUsuarios((usuariosActuales) => [
                ...usuariosActuales,
                datos
            ]);

            setNuevoAdmin({
                nombre: "",
                apellido: "",
                correo: "",
                password: "",
                telefono: "",
                direccion: ""
            });

            setMostrarFormulario(false);

            alert("Administrador creado correctamente 🎉");

        } catch (error) {

            console.error(error);

            alert(error.message);

        } finally {

            setGuardando(false);

        }

    };



    if (cargando) {

        return (
            <div className="admin-contenido">

                <h2>👥 Gestión de Usuarios</h2>

                <p>Cargando usuarios...</p>

            </div>
        );

    }

    if (error) {

        return (
            <div className="admin-contenido">

                <h2>👥 Gestión de Usuarios</h2>

                <p>{error}</p>

            </div>
        );

    }

    return (
        <div className="admin-contenido">
            <div className="admin-usuarios-header">
                <h2>👥 Gestión de Usuarios</h2>

                <button
                    className="btn-agregar-admin"
                    onClick={() =>
                        setMostrarFormulario(!mostrarFormulario)
                    }
                >
                    ➕ Agregar administrador
                </button>
            </div>


            {mostrarFormulario && (
                <form
                    className="formulario-admin"
                    onSubmit={crearAdministrador}
                >

                    <h3> Nuevo administrador</h3>

                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={nuevoAdmin.nombre}
                        onChange={manejarCambio}
                        required
                    />
                    <input
                        type="text"
                        name="apellido"
                        placeholder="Apellido"
                        value={nuevoAdmin.apellido}
                        onChange={manejarCambio}
                        required
                    />

                    <input
                        type="email"
                        name="correo"
                        placeholder="Correo"
                        value={nuevoAdmin.correo}
                        onChange={manejarCambio}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={nuevoAdmin.password}
                        onChange={manejarCambio}
                        required
                    />

                    <input
                        type="text"
                        name="telefono"
                        placeholder="Teléfono"
                        value={nuevoAdmin.telefono}
                        onChange={manejarCambio}
                        required
                    />

                    <input
                        type="text"
                        name="direccion"
                        placeholder="Dirección"
                        value={nuevoAdmin.direccion}
                        onChange={manejarCambio}
                        required
                    />

                    <div className="formulario-admin-botones">

                        <button
                            type="button"
                            onClick={() =>
                                setMostrarFormulario(false)
                            }
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={guardando}
                        >
                            {guardando
                                ? "Creando..."
                                : "Crear administrador"
                            }
                        </button>

                    </div>

                </form>
            )}



            <div className="tabla-productos">

                <table>

                    <thead>

                        <tr>

                            <th>Usuario</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Rol</th>
                            <th>Acciones</th>

                        </tr>

                    </thead>

                    <tbody>

                        {usuarios.map((usuario) => (

                            <React.Fragment
                                key={usuario.id_usuario}
                            >
                                <tr>

                                    <td>
                                        {usuario.nombre}{" "} {usuario.apellido}
                                    </td>

                                    <td>
                                        {usuario.correo}
                                    </td>

                                    <td>
                                        {usuario.telefono}
                                    </td>

                                    <td>
                                        {obtenerRol(usuario.id_rol)}
                                    </td>

                                    <td>

                                        <button
                                            className="btn-ver-pedido"
                                            onClick={() =>
                                                verDetalle(usuario)
                                            }
                                        >
                                            {usuarioDetalle?.id_usuario ===
                                                usuario.id_usuario
                                                ? "Ocultar"
                                                : "Ver más"}
                                        </button>

                                    </td>

                                </tr>

                                {usuarioDetalle?.id_usuario ===
                                    usuario.id_usuario && (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="detalle-pedido"
                                            >

                                                <div>

                                                    <h3>
                                                        👤 {usuario.nombre}{" "} {usuario.apellido}
                                                    </h3>

                                                    {pedidosUsuario.length === 0 ? (
                                                        <p> Este usuario aún no tiene pedidos. </p>
                                                    ) : (

                                                        <div>
                                                            {pedidosUsuario.map((pedido) => (
                                                                <div key={pedido.id_pedido} >
                                                                    <p> <strong> Nombre: </strong>{" "} {usuario.nombre}{" "} {usuario.apellido}
                                                                    </p>

                                                                    <p> <strong> Pedido: </strong>{" "} #{pedido.id_pedido} </p> <p> <strong> Estado: </strong>{" "} {pedido.estado} </p> <hr /> </div>

                                                            )
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                            </td>

                                        </tr>

                                    )}

                            </React.Fragment>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );

}

export default AdminUsers;