import "../styles/home.css";
import hero from "../assets/img/hero.png";
import { Link } from "react-router-dom";

function Home() {

    return (

        <section className="hero">

            <img
                src={hero}
                alt="Hero"
                className="hero-bg"
            />

            <div className="hero-content">

                <span className="hero-subtitle">
                    ¡TUS BANDERILLAS COREANAS FAVORITAS!
                </span>

                <h1>
                    Crujientes por fuera,
                    <br /><strong>
                    irresistibles por dentro
                </strong></h1>

                <p>
                    Disfruta nuestras banderillas coreanas <br/>
                    hechas con amor y el mejor sabor.
                </p>

                <div className="hero-buttons">
                    <Link to="/productos" >
                        <button>
                            Ver productos 🐾
                        </button>
                    </Link>

                    <Link to="/crear-banderilla">
                        <button>
                            Crea tu banderilla 🌭
                        </button>
                    </Link>
                </div>



            </div>

        </section>

    );

}

export default Home;