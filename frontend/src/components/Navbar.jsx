import "../styles/navbar.css";
import logo from "../assets/img/logo.jpeg";
import { FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const { cart } = useCart();
    const cartCount = cart.reduce(
        (total, producto) => total + producto.cantidad,
        0
    );

    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const sesionIniciada = !!token && !!usuario;

    const esAdministrador = usuario?.id_rol === 2;


    console.log("Usuario:", usuario);
    console.log("Rol:", usuario?.id_rol);
    console.log("Es administrador:", esAdministrador);


    return (
        <nav className="navbar">
            <div className="brand">
                <img
                    src={logo}
                    alt="Crunchy Clash"
                    className="logo-img"
                />
            </div>

            <ul className="nav-links">
                <li>
                    <Link to="/home">Inicio</Link>
                </li>

                <li>
                    <Link to="/productos">Productos</Link>
                </li>

                <li>
                    <Link to="/nosotros">Nosotros</Link>
                </li>

                <li>
                    <Link to="/contacto">Contacto</Link>
                </li>
            </ul>

            <div className="nav-buttons">

                <Link to="/carrito" className="cart-button">
                    <FiShoppingCart />

                    <span className="cart-badge">
                        {cartCount}
                    </span>
                </Link>


                {sesionIniciada ? (
<>
                    <Link
                        to="/perfil"
                        className="login-button"
                    >
                        <FiUser />

                        <span>
                            Mi perfil
                        </span>
                    </Link>



                    {esAdministrador && (
                    <Link
                        to="/admin"
                        className="admin-button"
                    >
                        🛠️

                        <span>
                            Administración
                        </span>
                    </Link>
                )}
            </>

                ) : (

                        

                    <Link
                        to="/login"
                        className="login-button"
                    >
                        <FiUser />

                        <span>
                            Ingresar
                        </span>
                    </Link>

                )}

                

                <div
                    className="menu-button"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen
                        ? <FiX />
                        : <FiMenu />
                    }
                </div>

            </div>



            {menuOpen && (
                <div className="mobile-menu">
                    <ul>

                        <li>
                            <Link to="/home" onClick={() => setMenuOpen(false)}>
                                Inicio
                            </Link>
                        </li>

                        <li>
                            <Link to="/productos" onClick={() => setMenuOpen(false)}>
                                Productos
                            </Link>
                        </li>

                        <li>
                            <Link to="/nosotros" onClick={() => setMenuOpen(false)}>
                                Nosotros
                            </Link>
                        </li>

                        <li>
                            <Link to="/contacto" onClick={() => setMenuOpen(false)}>
                                Contacto
                            </Link>
                        </li>

                        {sesionIniciada ? (
<>
                            <li>
                                <Link
                                    to="/perfil"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    👤 Mi perfil
                                </Link>
                            </li>

                            {esAdministrador && (
                            <li>
                                <Link
                                    to="/admin" 
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Administración
                                </Link>
                            </li>
                        )}
                            </>
                        ) : (

                            <li>
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Ingresar
                                </Link>
                            </li>

                        )}

                    </ul>

                </div>

            )}

        </nav>
    );
}

export default Navbar;