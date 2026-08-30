import "../styles/contacto.css";

function Contacto() {

    return (

        <section className="contacto">

            <div className="contacto-contenido">

                <h1>📩 Contáctanos</h1>

                <p className="contacto-intro">
                    ¿Tienes alguna pregunta o quieres hacer un pedido?
                    ¡Estamos felices de ayudarte!
                </p>

                <div className="contacto-seccion">

                    <h2>
                        Síguenos y descubre nuestras novedades,
                        productos y promociones.
                        </h2>

                    <p>📱
                        WhatsApp: +56 9 6576 7632
                    </p>

                    <p>
                        📸 Instagram: @crunchyclash
                    </p>

                    <p>
                        🎵 TikTok: @crunchy.clash
                    </p>

                </div>

                <div className="contacto-seccion">

                    <h2>📧 Correo</h2>

                    <p>
                        Puedes escribirnos a:
                    </p>

                    <p>
                        crunchy.clash@gmail.com
                    </p>

                </div>

                <div className="contacto-seccion">

                    <h2>📍 Ubicación</h2>

                    <p>
                        Realizamos entregas y retiros en La Florida,
                        Santiago.
                    </p>

                </div>

            </div>

        </section>

    );

}

export default Contacto;