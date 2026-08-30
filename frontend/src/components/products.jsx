import "../styles/products.css";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

function Products() {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [showAllBanderillas, setShowAllBanderillas] = useState(false);
    const [showAllBebidas, setShowAllBebidas] = useState(false);
    const [showAllSnacks, setShowAllSnacks] = useState(false);


    useEffect(() => {

        const obtenerProductos = async () => {

            try {

                const respuesta = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/productos`
                );

                if (!respuesta.ok) {
                    throw new Error("No se pudieron obtener los productos");
                }

                const datos = await respuesta.json();

                setProductos(datos);

            } catch (error) {

                console.error(error);

                setError(
                    "No se pudieron cargar los productos."
                );

            } finally {

                setCargando(false);

            }

        };

        obtenerProductos();

    }, []);


    const imagenes = import.meta.glob(
        "../assets/img/*",
        {
            eager: true,
            query: "?url",
            import: "default"
        }
    );


    const obtenerImagen = (imagen) => {

        if (!imagen) {
            return null;
        }

        if (
            imagen.startsWith("http://") ||
            imagen.startsWith("https://")
        ) {
            return imagen;
        }

        const ruta = `../assets/img/${imagen}`;

        return imagenes[ruta];

    };


    const banderillas = productos.filter(
        producto =>
            producto.categoria === "Banderillas" &&
            producto.activo
    );

    const bebidas = productos.filter(
        producto =>
            producto.categoria === "Bebidas" &&
            producto.activo
    );

    const snacks = productos.filter(
        producto =>
            producto.categoria === "Snacks" &&
            producto.activo
    );


    if (cargando) {

        return (
            <section className="products">
                <h2>Cargando productos...</h2>
            </section>
        );

    }


    if (error) {

        return (
            <section className="products">
                <h2>{error}</h2>
            </section>
        );

    }


    return (

        <section className="products">

            <h2>Nuestros Productos</h2>



            <div className="product-category">

                <h3 className="category-title">
                    🌭 Banderillas
                </h3>


                <div className="products-grid">

                    {banderillas
                        .slice(
                            0,
                            showAllBanderillas
                                ? banderillas.length
                                : 4
                        )
                        .map(producto => (

                            <ProductCard
                                key={producto.id_producto}
                                id_producto={producto.id_producto}
                                nombre={producto.nombre}
                                descripcion={producto.descripcion}
                                precio={Number(producto.precio)}
                                imagen={obtenerImagen(producto.imagen)}
                            />

                        ))}

                </div>


                {banderillas.length > 4 && (

                    <button
                        className="see-more"
                        onClick={() =>
                            setShowAllBanderillas(
                                !showAllBanderillas
                            )
                        }
                    >

                        {showAllBanderillas
                            ? "Ver menos"
                            : "Ver más"
                        }

                    </button>

                )}

            </div>



            <div className="product-category">

                <h3 className="category-title">
                    🥤 Bebidas
                </h3>


                <div className="products-grid">

                    {bebidas
                        .slice(
                            0,
                            showAllBebidas
                                ? bebidas.length
                                : 4
                        )
                        .map(producto => (

                            <ProductCard
                                key={producto.id_producto}
                                id_producto={producto.id_producto}
                                nombre={producto.nombre}
                                descripcion={producto.descripcion}
                                precio={Number(producto.precio)}
                                imagen={obtenerImagen(producto.imagen)}
                            />

                        ))}

                </div>


                {bebidas.length > 4 && (

                    <button
                        className="see-more"
                        onClick={() =>
                            setShowAllBebidas(
                                !showAllBebidas
                            )
                        }
                    >

                        {showAllBebidas
                            ? "Ver menos"
                            : "Ver más"
                        }

                    </button>

                )}

            </div>



            <div className="product-category">

                <h3 className="category-title">
                    🍫 Snacks
                </h3>


                <div className="products-grid">

                    {snacks
                        .slice(
                            0,
                            showAllSnacks
                                ? snacks.length
                                : 4
                        )
                        .map(producto => (

                            <ProductCard
                                key={producto.id_producto}
                                id_producto={producto.id_producto}
                                nombre={producto.nombre}
                                descripcion={producto.descripcion}
                                precio={Number(producto.precio)}
                                imagen={obtenerImagen(producto.imagen)}
                            />

                        ))}

                </div>


                {snacks.length > 4 && (

                    <button
                        className="see-more"
                        onClick={() =>
                            setShowAllSnacks(
                                !showAllSnacks
                            )
                        }
                    >

                        {showAllSnacks
                            ? "Ver menos"
                            : "Ver más"
                        }

                    </button>

                )}

            </div>


        </section>

    );

}

export default Products;