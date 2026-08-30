import { useEffect, useState } from "react";

function AdminProducts() {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [productoEditar, setProductoEditar] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [guardando, setGuardando] = useState(false);

    const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", descripcion: "", precio: "", stock: "", stock_minimo: "", imagen: "", personalizable: false, id_categoria: "" });

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
    //cambiar estado
    const cambiarEstado = async (producto) => {

        try {

            const accion = producto.activo
                ? "desactivar"
                : "activar";

            const respuesta = await fetch(
                `${import.meta.env.VITE_API_URL}/api/productos/${producto.id_producto}/${accion}`,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (!respuesta.ok) {

                throw new Error(
                    "No se pudo cambiar el estado del producto"
                );

            }

            const datos = await respuesta.json();

            setProductos((productosActuales) =>
                productosActuales.map((p) =>
                    p.id_producto === producto.id_producto
                        ? {
                            ...p,
                            ...datos.producto
                        }
                        : p
                )
            );

        } catch (error) {

            console.error(error);

            alert(
                "No se pudo cambiar el estado del producto."
            );
        }
    };
    //editar
    const abrirEditar = (producto) => {

        setProductoEditar({
            ...producto
        });

    };

    const guardarCambios = async () => {

        setGuardando(true);

        try {


            const respuesta = await fetch(
                `${import.meta.env.VITE_API_URL}/api/productos/${productoEditar.id_producto}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        nombre: productoEditar.nombre,
                        descripcion: productoEditar.descripcion,
                        precio: Number(productoEditar.precio),
                        stock: Number(productoEditar.stock),
                        stock_minimo: Number(productoEditar.stock_minimo),
                        imagen: productoEditar.imagen,
                        activo: productoEditar.activo,
                        personalizable: productoEditar.personalizable,
                        id_categoria: productoEditar.id_categoria
                    })
                }
            );

            if (!respuesta.ok) {

                const datos = await respuesta.json();

                throw new Error(
                    datos.error || "No se pudo actualizar el producto"
                );

            }

            const productoActualizado = await respuesta.json();

            setProductos((productosActuales) =>
                productosActuales.map((producto) =>
                    producto.id_producto === productoActualizado.id_producto
                        ? {
                            ...producto,
                            ...productoActualizado
                        }
                        : producto
                )
            );

            setProductoEditar(null);

            alert("Producto actualizado correctamente 🎉");

        } catch (error) {

            console.error(error);

            alert(
                error.message || "No se pudo actualizar el producto."
            );

        } finally {

            setGuardando(false);

        }

    };


    const manejarCambioNuevoProducto = (e) => {
        const { name, value, type, checked } = e.target;
        setNuevoProducto({
            ...nuevoProducto, [name]: type === "checkbox" ? checked : value
        });
    };


    const crearProducto = async (e) => {
        e.preventDefault();
        setGuardando(true);
        try {
            const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/api/productos`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        nombre: nuevoProducto.nombre, descripcion: nuevoProducto.descripcion,
                        precio: Number(nuevoProducto.precio),
                        stock: Number(nuevoProducto.stock), stock_minimo: Number(nuevoProducto.stock_minimo),
                        imagen: nuevoProducto.imagen || null,
                        personalizable: nuevoProducto.personalizable,
                        id_categoria: Number(nuevoProducto.id_categoria)
                    })
                });

            const datos = await respuesta.json();
            if (!respuesta.ok) {
                throw new Error(datos.error || "No se pudo crear el producto");
            }

            setProductos((productosActuales) => [
                ...productosActuales, datos]);


            setNuevoProducto({
                nombre: "",
                descripcion: "",
                precio: "",
                stock: "",
                stock_minimo: "",
                imagen: "",
                personalizable: false,
                id_categoria: ""
            });

            setMostrarFormulario(false); alert("Producto creado correctamente 🎉");

        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setGuardando(false);
        }
    };


    useEffect(() => {

        const obtenerProductos = async () => {

            try {

                const respuesta = await 
                    fetch(`${import.meta.env.VITE_API_URL}/api/productos`,
                );

                if (!respuesta.ok) {
                    throw new Error(
                        "No se pudieron obtener los productos"
                    );
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


    if (cargando) {
        return (
            <div className="admin-contenido">
                <h2>📦 Gestión de Productos</h2>
                <p>Cargando productos...</p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="admin-contenido">
                <h2>📦 Gestión de Productos</h2>
                <p>{error}</p>
            </div>
        );
    }


    return (
        <div className="admin-contenido">

            <div className="admin-usuarios-header">


                <h2>📦 Gestión de Productos</h2>

                <button className="btn-agregar-admin" onClick={() =>
                    setMostrarFormulario(!mostrarFormulario)} >
                    ➕ Agregar producto
                </button>
            </div>

            {mostrarFormulario && (
                <form className="formulario-admin" onSubmit={crearProducto} >
                    <h3>➕ Nuevo producto</h3>
                    <label> Nombre </label>
                    
                    <input type="text" name="nombre" placeholder="Nombre del producto" value={nuevoProducto.nombre} onChange={manejarCambioNuevoProducto} required />
                    
                    <label> Descripción </label>
                    
                    <textarea name="descripcion" placeholder="Descripción del producto" value={nuevoProducto.descripcion} onChange={manejarCambioNuevoProducto} />

                    <label> Precio </label>
                    
                    <input type="number" name="precio" placeholder="Precio" min="0" value={nuevoProducto.precio} onChange={manejarCambioNuevoProducto} required />
                    
                    <label> Stock </label>
                    <input type="number" name="stock" placeholder="Stock" min="0" value={nuevoProducto.stock} onChange={manejarCambioNuevoProducto} required />
                    
                    <label> Stock mínimo </label>
                    <input type="number" name="stock_minimo" placeholder="Stock mínimo" min="0" value={nuevoProducto.stock_minimo} onChange={manejarCambioNuevoProducto} required />
                    
                    <label> Categoría </label>
                    <select name="id_categoria" value={nuevoProducto.id_categoria} onChange={manejarCambioNuevoProducto} required >
                        <option value=""> Seleccionar categoría </option>
                        <option value="1"> Banderillas </option>
                        <option value="2"> Bebidas </option>
                        <option value="3"> Snacks </option>
                    </select>
                    
                    <label> URL de imagen </label> <input type="url" name="imagen" placeholder="https://ejemplo.com/imagen.jpg" value={nuevoProducto.imagen} onChange={manejarCambioNuevoProducto} />
                    
                    <label>
                        <input type="checkbox" name="personalizable" checked={nuevoProducto.personalizable} onChange={manejarCambioNuevoProducto} />
                        {" "}Producto personalizable
                    </label>

                    
                    <div className="formulario-admin-botones">
                        
                        <button type="button" onClick={() => {
                            
                            setMostrarFormulario(false);
                            
                            setNuevoProducto({
                                nombre: "",
                                descripcion: "",
                                precio: "",
                                stock: "",
                                stock_minimo: "",
                                imagen: "",
                                personalizable: false,
                                id_categoria: ""
                            });
                        }} >
                            Cancelar
                        </button>
                        
                        <button type="submit" disabled={guardando} >
                            {guardando ? "Creando..." : "Crear producto"}
                        </button>
                    </div>
                </form>
            )}


            {productoEditar && (

                <div className="formulario-editar">

                    <h3> Editar producto</h3>

                    <label>
                        Nombre
                    </label>

                    <input
                        type="text"
                        value={productoEditar.nombre}
                        onChange={(e) =>
                            setProductoEditar({
                                ...productoEditar,
                                nombre: e.target.value
                            })
                        }
                    />

                    <label>
                        Descripción
                    </label>

                    <textarea
                        value={productoEditar.descripcion || ""}
                        onChange={(e) =>
                            setProductoEditar({
                                ...productoEditar,
                                descripcion: e.target.value
                            })
                        }
                    />

                    <label>
                        URL de imagen
                    </label>

                    <input
                        type="url"
                        value={productoEditar.imagen || ""}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        onChange={(e) =>
                            setProductoEditar({
                                ...productoEditar,
                                imagen: e.target.value
                            })
                        }
                    />

                    <label>
                        Precio
                    </label>

                    <input
                        type="number"
                        value={productoEditar.precio}
                        onChange={(e) =>
                            setProductoEditar({
                                ...productoEditar,
                                precio: e.target.value
                            })
                        }
                    />

                    <label>
                        Stock
                    </label>

                    <input
                        type="number"
                        value={productoEditar.stock}
                        onChange={(e) =>
                            setProductoEditar({
                                ...productoEditar,
                                stock: e.target.value
                            })
                        }
                    />

                    <label>
                        Stock mínimo
                    </label>

                    <input
                        type="number"
                        value={productoEditar.stock_minimo}
                        onChange={(e) =>
                            setProductoEditar({
                                ...productoEditar,
                                stock_minimo: e.target.value
                            })
                        }
                    />



                    <div className="formulario-editar-botones">

                        <button
                            type="button"
                            onClick={() => setProductoEditar(null)}
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            onClick={guardarCambios}
                            disabled={guardando}
                        >
                            {guardando
                                ? "Guardando..."
                                : "Guardar cambios"
                            }
                        </button>

                    </div>

                </div>

            )}




            <div className="tabla-productos">

                <table>

                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>


                    <tbody>

                        {productos.map((producto) => (

                            <tr
                                key={producto.id_producto}
                            >
                                <td>

                {producto.imagen ? (

    <img
                                            src={producto.imagen.startsWith("http")
                                                ? producto.imagen
                                                : obtenerImagen(producto.imagen)}
                                            alt={producto.nombre}
                                            className="admin-producto-imagen"
                                        />

                                    ) : (

                                        <span className="sin-imagen">
                                            🐾
                                        </span>

                                    )}

                                </td>

                                <td>
                                    {producto.nombre}
                                </td>

                                <td>
                                    {producto.categoria}
                                </td>

                                <td>
                                    $
                                    {Number(
                                        producto.precio
                                    ).toLocaleString("es-CL")}
                                </td>

                                <td>
                                    {producto.stock}
                                </td>

                                <td>
                                    <button
                                        className={
                                            producto.activo
                                                ? "btn-estado activo"
                                                : "btn-estado inactivo"
                                        }
                                        onClick={() => cambiarEstado(producto)}
                                    >
                                        {producto.activo
                                            ? "🟢 Activo"
                                            : "🔴 Inactivo"
                                        }
                                    </button>
                                </td>

                                <td>
                                    <button
                                        className="btn-editar"
                                        onClick={() => abrirEditar(producto)}
                                    >
                                        Editar
                                    </button>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );

}

export default AdminProducts;