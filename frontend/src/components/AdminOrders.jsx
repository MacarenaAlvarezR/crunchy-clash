import React, { useEffect, useState } from "react";

function AdminOrders() {

    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [pedidoDetalle, setPedidoDetalle] = useState(null);
    const [cargandoDetalle, setCargandoDetalle] = useState(false);

    useEffect(() => {

        const obtenerPedidos = async () => {

            try {

                const respuesta = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/pedidos`,
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

                setPedidos(datos);

            } catch (error) {

                console.error(error);

                setError(
                    "No se pudieron cargar los pedidos."
                );

            } finally {

                setCargando(false);

            }
        };

        obtenerPedidos();

    }, []);
    //cambiar estado
    const cambiarEstado = async (pedido, estado) => {

        try {

            const respuesta = await fetch(
                `${import.meta.env.VITE_API_URL}/api/pedidos/${pedido.id_pedido}/estado`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        estado
                    })
                }
            );

            if (!respuesta.ok) {

                const datos = await respuesta.json();

                throw new Error(
                    datos.error || "No se pudo actualizar el estado"
                );
            }

            const datos = await respuesta.json();

            setPedidos((pedidosActuales) =>
                pedidosActuales.map((p) =>
                    p.id_pedido === pedido.id_pedido
                        ? {
                            ...p,
                            estado: datos.pedido.estado
                        }
                        : p
                )
            );

        } catch (error) {

            console.error(error);

            alert(error.message);

        }
    };



    const verDetalle = async (id) => {

        if (
            pedidoDetalle &&
            pedidoDetalle.pedido.id_pedido === id
        ) {

            setPedidoDetalle(null);

            return;
        }

        setCargandoDetalle(true);

        try {

            const respuesta = await fetch(
                `${import.meta.env.VITE_API_URL}/api/pedidos/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const datos = await respuesta.json();

            console.log("DETALLE PEDIDO:", datos);

            if (!respuesta.ok) {

                throw new Error(
                    datos.error || "No se pudo obtener el detalle del pedido"
                );

            };

            setPedidoDetalle(datos);

        } catch (error) {

            console.error("ERROR AL CARGAR DETALLE:", error);

            alert(error.message);

        } finally {

            setCargandoDetalle(false);

        };
    };




    //cargar pedidos
    if (cargando) {
        return (
            <div className="admin-contenido">
                <h2>🛒 Gestión de Pedidos</h2>
                <p>Cargando pedidos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-contenido">
                <h2>🛒 Gestión de Pedidos</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="admin-contenido">

            <h2>🛒 Gestión de Pedidos</h2>

            <div className="tabla-productos">

                <table>

                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

                        {pedidos.map((pedido) => (


                            <React.Fragment key={pedido.id_pedido}>

                                <tr>
                                    <td>
                                        #{pedido.id_pedido}
                                    </td>

                                    <td>
                                        {pedido.nombre} {pedido.apellido}
                                    </td>

                                    <td>
                                        {new Date(
                                            pedido.fecha
                                        ).toLocaleDateString("es-CL")}
                                    </td>

                                    <td>
                                        $
                                        {Number(pedido.total).toLocaleString("es-CL")}
                                    </td>

                                    <td>

                                        <select
                                            value={pedido.estado}
                                            onChange={(e) =>
                                                cambiarEstado(
                                                    pedido,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="pendiente">
                                                🟡 Pendiente
                                            </option>

                                            <option value="preparando">
                                                🟠 Preparando
                                            </option>

                                            <option value="listo para retirar">
                                                🔵 Listo para retirar
                                            </option>

                                            <option value="entregado">
                                                🟢 Entregado
                                            </option>

                                        </select>

                                    </td>


                                    <td>

                                        <button
                                            className="btn-ver-pedido"
                                            onClick={() => verDetalle(pedido.id_pedido)}
                                        >
                                            {pedidoDetalle?.pedido?.id_pedido === pedido.id_pedido
                                                ? "Ocultar"
                                                : "Ver pedido"
                                            }
                                        </button>

                                    </td>

                                </tr>

                                {pedidoDetalle?.pedido?.id_pedido ===
                                    pedido.id_pedido && (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="detalle-pedido"
                                            >

                                                {cargandoDetalle ? (

                                                    <p>
                                                        Cargando detalle...
                                                    </p>
                                                ) : (

                                                    <div>

                                                        <h3>
                                                            🛒 Detalle del pedido #{pedidoDetalle.pedido.id_pedido}
                                                        </h3>
                                                        <p>
                                                            <strong>
                                                                Cliente:
                                                            </strong>{" "}

                                                            {pedidoDetalle.pedido.nombre}{" "}
                                                            {pedidoDetalle.pedido.apellido}
                                                        </p>


                                                        <p>
                                                            <strong>
                                                                Correo:
                                                            </strong>{" "}
                                                            {pedidoDetalle.pedido.correo}
                                                        </p>


                                                        <h4>
                                                            Productos
                                                        </h4>


                                                        <ul>
                                                            {pedidoDetalle.productos.map(
                                                                (producto,index) => (

                                                                    <li key={index}>

                                                                        <strong>
                                                                            {producto.nombre}
                                                                        </strong>

                                                                        {" × "}

                                                                        {producto.cantidad}

                                                                        {" — $"}

                                                                        {Number(
                                                                            producto.precio_unitario
                                                                        ).toLocaleString("es-CL")}

                                                                        {producto.descripcion && (
                                                                            <p>
                                                                                {producto.descripcion}
                                                                            </p>
                                                                        )}

                                                                    </li>

                                                                )
                                                            )}

                                                        </ul>


                                                        <p>

                                                            <strong>
                                                                Total:
                                                            </strong>{" "}

                                                            $

                                                            {Number(
                                                                pedidoDetalle
                                                                    .pedido
                                                                    .total
                                                            ).toLocaleString(
                                                                "es-CL"
                                                            )}

                                                        </p>

                                                    </div>

                                                )}

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

export default AdminOrders;