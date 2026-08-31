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


    const total = cart.reduce(
        (acumulado, producto) =>
            acumulado +
            Number(producto.precio) *
            producto.cantidad,
        0
    );

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


            clearCart();


            alert(
                `¡Pedido realizado correctamente! 🧡\nPedido #${datos.pedido.id_pedido}`
            );


            navigate("/mispedidos");


        } catch (error) {

            console.error(error);

            alert(error.message);

        } finally {

            setComprando(false);

        }

    };



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
                                onClick={() =>
                                    removeFromCart(
                                        producto.id_carrito
                                    )
                                }
                            >
                                🗑
                            </button>

                        </div>

                    ))}


                    <button
                        className="vaciar-carrito"
                        onClick={clearCart}
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
