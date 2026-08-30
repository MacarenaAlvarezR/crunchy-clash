import "../styles/productCard.css";
import { FiHeart } from "react-icons/fi";
import { useState } from "react";
import { useCart } from "../context/useCart";


function ProductCard({ id_producto,nombre, descripcion, precio, imagen }) {

    const { cart, addToCart } = useCart();
    
    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );
    const claveFavoritos = usuario ? `favoritos_${usuario.id_usuario}`
        : "favoritos";


    const favoritosGuardados =
        JSON.parse(localStorage.getItem(claveFavoritos)) || [];

    const favoritoInicial =
        favoritosGuardados.some(
            producto =>
                producto.id_producto === id_producto
        );
    
    const [favorite, setFavorite] = useState(favoritoInicial);

    const productoAgregado = cart.some(producto => producto.id_producto === id_producto);

    const cambiarFavorito = () => {

        const favoritos =
            JSON.parse(
                localStorage.getItem(claveFavoritos)
            ) || [];


        if (favorite) {

            const nuevosFavoritos =
                favoritos.filter(
                    producto =>
                        producto.id_producto !==
                        id_producto
                );

            localStorage.setItem(
                claveFavoritos,
                JSON.stringify(nuevosFavoritos)
            );

            setFavorite(false);

        } else {
            const producto = {
                id_producto,
                nombre,
                descripcion,
                precio,
                imagen
            };

            favoritos.push(producto);

            localStorage.setItem(
                claveFavoritos,
                JSON.stringify(favoritos)
            );
            setFavorite(true);
        }
    };


    return (

        <div className="product-card">


            <button
                className={
                    favorite
                        ? "favorite active"
                        : "favorite"
                }

                onClick={cambiarFavorito}
            >

                <FiHeart />

            </button>



            <img
                src={imagen}
                alt={nombre}
            />


            <h3>
                {nombre}
            </h3>


            <p>
                {descripcion}
            </p>
            


            <span className="price">

                ${Number(precio).toLocaleString("es-CL")}

            </span>


            <button className="add-button"
                onClick={() =>
                    addToCart({
                        id_producto,
                        nombre,
                        descripcion,
                        precio,
                        imagen
                    })
                }>

                {productoAgregado ? "✓ Agregado" : "🛒 Agregar al carrito"}

            </button>


        </div>

    );

}


export default ProductCard;