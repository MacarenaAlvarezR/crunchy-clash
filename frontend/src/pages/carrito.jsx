import "../styles/carrito.css";
import { useCart } from "../context/useCart";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

function Carrito() {



    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart
    } = useCart();

    const navigate = useNavigate();

    const [comprando, setComprando] = useState(false);

    const [boleta, setBoleta] = useState(null);

    const total = cart.reduce(
        (acumulado, producto) =>
            acumulado +
            Number(producto.precio) *
            producto.cantidad,
        0
    );

    const confirmarEliminacion = (accion, mensaje) => {
        const confirmar = window.confirm(mensaje);
        if (confirmar) {
            accion(); 
            
        }
    };

    const realizarCompra = async () => {

        const token = localStorage.getItem("token");


        if (!token) {

            alert(
                "Debes iniciar sesión para realizar una compra."
            );

            navigate("/login");

            return;
        }

        setComprando(true);


        try {
            const productos = cart.map((producto) => ({

                id_producto: producto.id_producto,

                cantidad: producto.cantidad,
                personalizada:
                    producto.banderilla
                        ? true
                        : false,

                banderilla:
                    producto.banderilla
                        ? {
                            id_producto:
                                producto.banderilla.id_producto
                        }
                        : null,
                cobertura:
                    producto.cobertura
                        ? {
                            id_cobertura:
                                producto.cobertura.id_cobertura
                        }
                        : null,
                bebida:
                    producto.bebida
                        ? {
                            id_producto:
                                producto.bebida.id_producto
                        }
                        : null,
                snack:
                    producto.snack
                        ? {
                            id_producto:
                                producto.snack.id_producto
                        }
                        : null
            }));




            const respuesta = await fetch(
                `${import.meta.env.VITE_API_URL}/api/pedidos`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify({ productos })
                }
            );
                    



            const datos = await respuesta.json();


            if (!respuesta.ok) {

                throw new Error(
                    datos.error ||
                    "No se pudo realizar el pedido"
                );

            }
//mm
            const idPedido = datos.pedido.id_pedido;
            const respuestaBoleta = await fetch(`${import.meta.env.VITE_API_URL}/api/pedidos/${idPedido}`, { headers: { "Authorization": `Bearer ${token}` } });


            const datosBoleta = await respuestaBoleta.json(); if (!respuestaBoleta.ok) { throw new Error(datosBoleta.error || "El pedido se creó, pero no se pudo cargar la boleta."); }


            clearCart();


            setBoleta(datosBoleta);


        } catch (error) {

            console.error(error);

            alert(error.message);

        } finally {

            setComprando(false);

        }

    };

    //boleta
    if (boleta) {
        const { pedido, productos } = boleta;
        
        return (
            <section className="boleta-pantalla"> <div className="boleta">
                <div className="boleta-encabezado">
                    <h1> Crunchy Clash 🧡 </h1>
                    <h2> ¡Compra realizada! 🎉 </h2>
                    
                    <p> BOLETA DE COMPRA </p>
                </div>
                <div className="boleta-datos">
                    <p> <strong> Pedido: </strong>{" "} #{pedido.id_pedido} </p>
                    
                    <p> <strong> Fecha: </strong>{" "} {new Date(pedido.fecha).toLocaleString("es-CL")} </p>
                    
                    <p> <strong> Estado: </strong>{" "}
                        
                        <span className="pedido-estado"> {pedido.estado} </span>
                    </p>
                
                </div>
                <div className="boleta-cliente">
                    
                    <h3> Datos del cliente </h3>
                    
                    <p> <strong> Nombre: </strong>{" "} {pedido.nombre}{" "} {pedido.apellido} </p>
                    
                    <p> <strong> Correo: </strong>{" "} {pedido.correo} </p>
                </div>
                
                <div className="boleta-productos">
                    <h3> Detalle de compra </h3>
                    
                    {productos.map((producto, index) => {
                        const subtotal = Number(
                            producto.precio_unitario) * Number(
                                producto.cantidad);
                        
                        return (
                            <div className="boleta-producto" key={index} >
                            
                                <div> <strong> {producto.nombre} </strong> {producto.descripcion && (
                                    <p> {producto.descripcion} </p>)}
                                    
                                    <span> {producto.cantidad} × $ {Number(producto.precio_unitario).toLocaleString("es-CL")} </span>
                                
                                </div> <strong> $ {subtotal.toLocaleString("es-CL")}
                                </strong>
                            
                            </div>);
                    })}
                </div>
                
                <div className="boleta-total">
                    <span> Total </span> <strong> $ {Number(pedido.total).toLocaleString("es-CL")} </strong>
                
                </div>
                
                <div className="boleta-acciones">
                    <button onClick={() => window.print()} > 🖨️ Imprimir / Guardar PDF </button>
                    
                    <button onClick={() => navigate("/mispedidos")} >
                        📦 Ver mis pedidos </button> 
                        
                    <button onClick={() => navigate("/")} > 🏠 Volver al inicio </button> 
                    
                </div>
            </div>
            </section>
        );
    }



    if (cart.length === 0) {

        return (

            <section className="carrito">

                <div className="carrito-vacio">

                    <h1>Tu carrito está vacío 🛒</h1>

                    <p>
                        Agrega algunos productos para comenzar tu pedido.
                    </p>

                    <Link
                        to="/productos"
                        className="volver-productos"
                    >
                        Ver productos
                    </Link>

                </div>

            </section>

        );

    }


    return (

        <section className="carrito">

            <h1>Mi carrito 🛒</h1>


            <div className="carrito-contenido">


                <div className="carrito-productos">

                    {cart.map((producto) => (

                        <div
                            className="carrito-item"
                            key={producto.id_carrito}
                        >

                            <img
                                src={producto.imagen}
                                alt={producto.nombre}
                            />


                            <div className="carrito-info">

                                <h3>
                                    {producto.nombre}
                                </h3>

                                <p>
                                    {producto.descripcion}
                                </p>

                                <strong>
                                    ${Number(producto.precio).toLocaleString("es-CL")}
                                </strong>

                            </div>


                            <div className="cantidad">

                                <button
                                    onClick={() =>
                                        decreaseQuantity(
                                            producto.id_carrito
                                        )
                                    }
                                >
                                    −
                                </button>

                                <span>
                                    {producto.cantidad}
                                </span>

                                <button
                                    onClick={() =>
                                        increaseQuantity(
                                            producto.id_carrito
                                        )
                                    }
                                >
                                    +
                                </button>

                            </div>


                            <button
                                className="eliminar"
                                onClick={() => confirmarEliminacion(() => removeFromCart(producto.id_carrito), "¿Deseas eliminar este producto del carrito?")}
                            >
                                🗑
                            </button>

                        </div>

                    ))}


                    <button
                        className="vaciar-carrito"
                        onClick={() => confirmarEliminacion(clearCart, "¿Deseas eliminar todos los productos del carrito?")}
                    >
                        Vaciar carrito
                    </button>

                </div>


                <div className="carrito-resumen">

                    <h2>Resumen</h2>

                    <div className="total">

                        <span>Total</span>

                        <strong>
                            ${total.toLocaleString("es-CL")}
                        </strong>

                    </div>


                    <button className="continuar-compra" onClick={realizarCompra}
                        disabled={comprando}>
                        {comprando
                            ? "Procesando..."
                            : "Comprar 🛒"
                        }
                    </button>

                </div>

            </div>

        </section>

    );

}

export default Carrito;
