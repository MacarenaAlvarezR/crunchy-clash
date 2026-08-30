import "../styles/favoritos.css";
import { useState } from "react";

function Favoritos() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
        
    const claveFavoritos = usuario ? `favoritos_${usuario.id_usuario}` : "favoritos";

    const [favoritos, setFavoritos] = useState(() => {
        return JSON.parse(
            localStorage.getItem(claveFavoritos)
        ) || [];
    });


    const eliminarFavorito = (id) => {

        const nuevosFavoritos = favoritos.filter(
            producto =>
                producto.id_producto !== id
        );

        localStorage.setItem(claveFavoritos, JSON.stringify(nuevosFavoritos));

        setFavoritos(nuevosFavoritos);

    };


    return (

        <section className="favoritos">

            <div className="favoritos-contenido">

                <h1>❤️ Mis favoritos</h1>

                {favoritos.length === 0 ? (

                    <div className="favoritos-vacio">

                        <p>
                            Aún no tienes productos favoritos.
                        </p>

                        <span>
                            ¡Agrega tus favoritos desde nuestros productos! 🐾
                        </span>

                    </div>

                ) : (

                    <div className="favoritos-lista">

                        {favoritos.map((producto) => (

                            <div
                                className="favorito-item"
                                key={producto.id_producto}
                            >

                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                />

                                <div className="favorito-info">

                                    <h3>
                                        {producto.nombre}
                                    </h3>

                                    <p>
                                        {producto.descripcion}
                                    </p>

                                    <span>
                                        $
                                        {Number(
                                            producto.precio
                                        ).toLocaleString("es-CL")}
                                    </span>

                                </div>

                                <button
                                    onClick={() =>
                                        eliminarFavorito(
                                            producto.id_producto
                                        )
                                    }
                                >
                                    ❤️ Quitar
                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </section>

    );

}

export default Favoritos;