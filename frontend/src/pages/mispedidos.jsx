import "../styles/misPedidos.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MisPedidos() {

    const navigate = useNavigate();

    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const obtenerPedidos = async () => {

            try {

                const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/api/pedidos/mispedidos`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const datos = await respuesta.json();



                if (!respuesta.ok) {

                    setError(
                        datos.error || "No se pudieron obtener los pedidos"
                    );

                    return;
                }

                setPedidos(datos);

            } catch (error) {

                console.error(error);

                setError(
                    "No se pudo conectar con el servidor."
                );

            } finally {

                setCargando(false);

            }
        };

        obtenerPedidos();

    }, [navigate]);


    if (cargando) {
        return (
            <section className="mis-pedidos">
                <div className="pedidos-card">
                    <h1>Mis pedidos 📦</h1>
                    <p>Cargando tus pedidos...</p>
                </div>
            </section>
        );
    }


    return (

        <section className="mis-pedidos">

            <div className="pedidos-card">

                <h1>Mis pedidos 📦</h1>

                <p className="pedidos-subtitulo">
                    Aquí puedes revisar tus pedidos realizados.
                </p>


                {error && (
                    <p className="mensaje-error">
                        {error}
                    </p>
                )}


                {!error && pedidos.length === 0 && (

                    <div className="sin-pedidos">

                        <div className="sin-pedidos-icon">
                            🛍️
                        </div>

                        <h2>Aún no tienes pedidos</h2>

                        <p>
                            Cuando realices una compra,
                            aparecerá aquí.
                        </p>

                        <button
                            onClick={() => navigate("/productos")}
                        >
                            Ver productos
                        </button>

                    </div>

                )}


                {pedidos.length > 0 && (

                    <div className="lista-pedidos">

                        {pedidos.map((pedido) => (

                            <div
                                className="pedido"
                                key={pedido.id_pedido}
                            >

                                <div className="pedido-header">

                                    <h2>
                                        Pedido #{pedido.id_pedido}
                                    </h2>

                                    <span className="pedido-estado">
                                        {pedido.estado}
                                    </span>

                                </div>


                                <div className="pedido-info">

                                    <p>
                                        <strong>Fecha:</strong>{" "}
                                        {new Date(
                                            pedido.fecha
                                        ).toLocaleDateString("es-CL")}
                                    </p>

                                    <p>
                                        <strong>Total:</strong>{" "}
                                        ${Number(
                                            pedido.total
                                        ).toLocaleString("es-CL")}
                                    </p>
                                   

                                </div>

                                <div className="pedido-productos"> <h3> Productos </h3> {pedido.productos && pedido.productos.length > 0 ? (
                                    <ul>
                                        {pedido.productos.map((producto, index) => (
                                            <li key={index} className="producto-pedido">
                                                
                                                <div>
                                                    <strong> {producto.nombre} </strong> {" × "} {producto.cantidad} {" — $"} {Number(producto.precio_unitario).toLocaleString("es-CL")}
                                                </div>{producto.descripcion && (<p> {producto.descripcion} </p>
                                                )}
                                            </li>
                                        ))}
                                    
                                </ul>
                                ) : (
                                    <p> No hay productos registrados en este pedido. </p> 
                                    )}
                                    
                                </div>
                            </div>

                        ))}

                            </div>
                            

                )}


                <button
                    className="volver-perfil"
                    onClick={() => navigate("/perfil")}
                >
                    ← Volver a mi perfil
                </button>

            </div>

        </section>

    );
}

export default MisPedidos;