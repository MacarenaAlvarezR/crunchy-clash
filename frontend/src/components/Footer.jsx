import "../styles/footer.css";
import logo from "../assets/img/logo.jpeg";
import { FiInstagram, FiMail, FiPhone } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa"; 
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-content">


                <div className="footer-brand">

                    <img
                        src={logo}
                        alt="Crunchy Clash"
                        className="footer-logo"
                    />

                    <h3>Crunchy Clash</h3>

                    <p>
                        Productos deliciosos para disfrutar
                        y compartir.
                    </p>

                </div>


                <div className="footer-section">

                    <h4>Enlaces</h4>

                    <ul>
                        <li>
                            <Link to="/home">Inicio</Link>
                        </li>

                    </ul>

                </div>



                <div className="footer-section">

                    <h4>Contacto</h4>

                    <p>
                        <FiMail />
                        contacto@crunchyclash.cl
                    </p>

                    <p>
                        <FiPhone />
                        +56 9 6576 7632
                    </p>

                </div>



                <div className="footer-section">

                    <h4>Síguenos</h4>

                    <div className="social-icons">

                        <a href="https://www.instagram.com/crunchyclash"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram">
                            <FiInstagram />
                        </a>

                        <a
                            href="https://www.tiktok.com/@crunchy.clash"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="TikTok"
                        >
                            <FaTiktok />
                        </a>

                    </div>

                </div>

            </div>


            <div className="footer-bottom">

                <p>
                    © 2026 Crunchy Clash — Todos los derechos reservados.
                </p>

            </div>

        </footer>
    );
}

export default Footer;