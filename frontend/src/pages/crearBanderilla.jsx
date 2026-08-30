import "../styles/crearBanderilla.css";
import { useState} from "react";
import {useCart} from "../context/useCart.js";

//banderillas
import clasica from "../assets/img/band-clasic.jpg";
import queso from "../assets/img/band-queso.jpg";
import mixta from "../assets/img/band-mixta.jpg";

//coberturas
import flamin from "../assets/img/cub-flamin.jpg";
import dorito from "../assets/img/cub-dorito.jpg";
import ramen from "../assets/img/cub-ramen.jpg";
import papa from "../assets/img/cub-papa.jpg";

//bebidas
import durazno from "../assets/img/beb-durazno.webp";
import mango from "../assets/img/beb-mango.webp";
import melon from "../assets/img/beb-melon.webp";
import naranja from "../assets/img/beb-naranja.webp";
import sandia from "../assets/img/beb-sandia.webp";
import bubbleBrown from "../assets/img/bubble-brown.webp";
import bubbleFrutilla from "../assets/img/bubble-frutilla.webp";
import bubbleHoneydew from "../assets/img/bubble-honeydew.webp";
import bubbleMatcha from "../assets/img/bubble-matcha.webp";
import bubbleTaro from "../assets/img/bubble-taro.webp";
//snacks
import peperoOriginal from "../assets/img/pepero original.webp";
import peperoAlmendra from "../assets/img/pepero-almendra.webp";
import peperoFrutilla from "../assets/img/pepero-frutilla.webp";
import snackCiruela from "../assets/img/snack-ciruela.webp";
import snackKiwi from "../assets/img/snack-kiwi.webp";
import snackMangoCoco from "../assets/img/snack-mango-coco.webp";


function CrearBanderilla() {

    const { addToCart } = useCart();

    const [paso, setPaso] = useState(1);

    const [banderillaSeleccionada, setBanderillaSeleccionada] = useState(null);
    
    const [coberturaSeleccionada, setCoberturaSeleccionada] = useState(null);

    const [bebidaSeleccionada, setBebidaSeleccionada] = useState(null);
    
    const [snackSeleccionado, setSnackSeleccionado] = useState(null);


    const banderillas = [{
        id_producto:3,
        id: "clasica",
        nombre: "Banderilla Clásica",
        descripcion: "Salchicha",
        precio: 3990,
        imagen: clasica
    }
        ,
        {
            id_producto: 1,

        id: "queso",
        nombre: "Banderilla de Queso",
        descripcion: "Queso mozzarella",
        precio: 5990,
        imagen: queso
    }
        ,
        {
            id_producto: 6,

        id: "mixta",
        nombre: "Banderilla Mixta",
        descripcion: "Queso mozzarella + salchicha",
        precio: 4990,
        imagen: mixta
    }];


    const coberturas = [{
        id_cobertura: 1,
        id: "panko",
        nombre: "Panko",
        descripcion: "Cobertura clásica incluida",
        extra: 0,
        imagen: clasica,
        sinPanko: false
    }
        ,
        {
        id_cobertura: 2,
        id: "papa",
        nombre: "Papa",
        descripcion: "Papa + panko",
        extra: 500,
        imagen: papa,
        sinPanko: false
    }
        ,
        {
        id_cobertura: 3,
        id: "flamin",
        nombre: "Flamin",
        descripcion: "Cobertura Flamin",
        extra: 1000,
        imagen: flamin,
        sinPanko: true
    }
        ,
        {
        id_cobertura: 4,
        id: "dorito",
        nombre: "Dorito",
        descripcion: "Cobertura Dorito",
        extra: 1000,
        imagen: dorito,
        sinPanko: true
    }
        ,
        {
        id_cobertura: 5,
        id: "ramen",
        nombre: "Ramen",
        descripcion: "Cobertura Ramen",
        extra: 1000,
        imagen: ramen,
        sinPanko: true
    }];

    const bebidas = [{
        id_producto:8,
        id: "durazno",
        nombre: "Bebida de Durazno",
        precio: 1990,
        imagen: durazno
    }
        ,
        {
            id_producto: 9,
        id: "naranja",
        nombre: "Bebida sabor Naranja",
        precio: 1990,
        imagen: naranja
    }
        ,
        {
            id_producto: 10,

        id: "sandia",
        nombre: "Bebida de Sandía",
        precio: 1990,
        imagen: sandia
    }
        ,
        {
            id_producto: 11,

        id: "mango",
        nombre: "Bebida de Mango",
        precio: 1990,
        imagen: mango
    }
        ,
        {
            id_producto: 12,

        id: "melon",
        nombre: "Bebida de Melón",
        precio: 1990,
        imagen: melon
    }
        ,
        {
            id_producto: 13,

        id: "bubble-frutilla",
        nombre: "Bubble Tea Frutilla",
        precio: 2990,
        imagen: bubbleFrutilla
    }
        ,
        {
            id_producto: 14,

        id: "bubble-honeydew",
        nombre: "Bubble Tea Honeydew",
        precio: 2990,
        imagen: bubbleHoneydew
    }
        ,
        {
            id_producto: 15,

        id: "bubble-brown",
        nombre: "Bubble Tea Brown Sugar",
        precio: 2990,
        imagen: bubbleBrown
    }
        ,
        {
            id_producto: 16,

        id: "bubble-matcha",
        nombre: "Bubble Tea Matcha",
        precio: 2990,
        imagen: bubbleMatcha
    }
        ,
        {
            id_producto: 17,

        id: "bubble-taro",
        nombre: "Bubble Tea Taro",
        precio: 2990,
        imagen: bubbleTaro
    }];

    const snacks = [{
        id_producto: 18,

        id: "pepero-original",
        nombre: "Pepero Original",
        precio: 1990,
        imagen: peperoOriginal
    }
        ,
        {
            id_producto: 19,

        id: "pepero-frutilla",
        nombre: "Pepero Frutilla",
        precio: 1990,
        imagen: peperoFrutilla
    }
        ,
        {
            id_producto: 20,

        id: "pepero-almendra",
        nombre: "Pepero Almendra",
        precio: 1990,
        imagen: peperoAlmendra
    }
        ,
        {
            id_producto: 21,

        id: "snack-kiwi",
        nombre: "Snack Kiwi",
        precio: 1990,
        imagen: snackKiwi
    }
        ,
        {
            id_producto: 22,

        id: "snack-mango-coco",
        nombre: "Snack Mango Coco",
        precio: 1990,
        imagen: snackMangoCoco
    }
        ,
    {
        id_producto: 23,

        id: "snack-ciruela",
        nombre: "Snack Ciruela",
        precio: 1990,
        imagen: snackCiruela
    }];


    const seleccionarBanderilla = (banderilla) => {
        setBanderillaSeleccionada(banderilla);
    };

    const seleccionarCobertura = (cobertura) => {
        setCoberturaSeleccionada(cobertura);
    };

    const seleccionarBebida = (bebida) => {
        setBebidaSeleccionada(bebida);
    };

    const seleccionarSnack = (snack) => {
        setSnackSeleccionado(snack);
    };

    const siguientePaso = () => {

        if (paso === 1 && !banderillaSeleccionada) {
            return;
        }

        if (paso === 2 && !coberturaSeleccionada) {
            return;
        }
        setPaso(paso + 1);
    };
    const pasoAnterior = () => {
        setPaso(paso - 1);
    };

//total
    const calcularTotal = () => {

        if (!banderillaSeleccionada || !coberturaSeleccionada) {
            return 0;
        }

        return (
        banderillaSeleccionada.precio + coberturaSeleccionada.extra + (bebidaSeleccionada?.precio || 0) + (snackSeleccionado?.precio || 0)
    );
    };

//agrega al card
    const agregarAlCarrito = () => {

        const total = calcularTotal();
        const banderillaPersonalizada = {

            id_producto: banderillaSeleccionada.id_producto,

            nombre: "Banderilla personalizada",

            descripcion: `${banderillaSeleccionada.nombre} + ${coberturaSeleccionada.nombre}${bebidaSeleccionada
                    ? ` + ${bebidaSeleccionada.nombre}`
                    : ""
                }${snackSeleccionado
                    ? ` + ${snackSeleccionado.nombre}`
                    : ""
                }`,

            precio: total,

            imagen: banderillaSeleccionada.imagen,

            banderilla: { id_producto: banderillaSeleccionada.id_producto, nombre: banderillaSeleccionada.nombre },

            cobertura: { id_cobertura: coberturaSeleccionada.id_cobertura, nombre: coberturaSeleccionada.nombre },

            bebida: bebidaSeleccionada ? { id_producto: bebidaSeleccionada.id_producto, nombre: bebidaSeleccionada.nombre } : null,

            snack: snackSeleccionado ? { id_producto: snackSeleccionado.id_producto, nombre: snackSeleccionado.nombre } : null
        };

        addToCart(banderillaPersonalizada);

        setPaso(1);
        setBanderillaSeleccionada(null);
        setCoberturaSeleccionada(null);
        setBebidaSeleccionada(null);
        setSnackSeleccionado(null);
    };

    const formatoPrecio = (precio) => {
        return precio.toLocaleString("es-CL");
    };


    return (
        <section className="crear-banderilla" >
        <div className="crear-header" >
            <span className="crear-subtitle" > 🌭 CREA TU BANDERILLA </span>
            <h1> Arma tu combinación perfecta </h1>
            <p> Elige cada parte de tu pedido y crea una banderilla a tu gusto. </p>
        </div> 
        
            <div className="pasos" >
                <span className={paso >= 1 ? "paso activo" : "paso"}>
                    1. Banderilla
                </span>
                <span className={paso >= 2 ? "paso activo" : "paso"}>
                    2. Cobertura </span>
                <span className={paso >= 3 ? "paso activo" : "paso"}>
                    3. Bebida </span>
                <span className={paso >= 4 ? "paso activo" : "paso"}>
                    4. Snack </span>
                <span className={paso >= 5 ? "paso activo" : "paso"}>
                    5. Resumen </span>
            </div>

            {paso === 1 && (
                <div className="paso-contenido" >
                <h2>Elige tu banderilla</h2>
                    <p className="paso-descripcion" > Primero elige la base de tu banderilla. </p>
                <div className="opciones-grid" >
                    {banderillas.map((banderilla) => (
                            
                        <button key={banderilla.id}

                    className={
                        banderillaSeleccionada?.id === banderilla.id ? "opcion-card seleccionada"
                            : "opcion-card"
                    }

                    onClick={() => seleccionarBanderilla(banderilla)} >
                    <img src={banderilla.imagen}
                        alt={banderilla.nombre} />
                    
                    <div className="opcion-info" >
                        <h3> {banderilla.nombre}
                        </h3>
                        <p> {banderilla.descripcion}
                        </p> <strong> ${formatoPrecio(banderilla.precio)}
                        </strong>
                    </div>
                </button>
                ))}

                        

                </div>
                
                <div className="acciones" > 
                    
                    <button className="btn-siguiente"
                onClick={siguientePaso}
                disabled={!banderillaSeleccionada}
                    > Continuar → </button>
                </div>
            </div>
        )}


            {paso === 2 && (
                <div className="paso-contenido" >
                <h2>Elige tu cobertura</h2>
                <p className="paso-descripcion" > El panko viene incluido, excepto en Flamin, Dorito y Ramen. </p>
                <div className="opciones-grid" >
                    {coberturas.map((cobertura) => (<button key={cobertura.id}

                    className={
                        coberturaSeleccionada?.id === cobertura.id ? "opcion-card seleccionada"
                            : "opcion-card"
                    }

                        onClick={() => seleccionarCobertura(cobertura)} >
                        
                        <img src={cobertura.imagen}
                    alt={cobertura.nombre}/>

                        <div className="opcion-info" >
                            <h3> {cobertura.nombre }
                            </h3>
                            <p> {cobertura.descripcion}
                            </p> <strong> {cobertura.extra === 0 ?
                                "Incluido": `+${formatoPrecio(cobertura.extra)}`
                    }

                            </strong>
                        </div>
                    </button>))
            }

                </div>
                
                <div className="acciones" >
                    <button className="btn-volver"
                onClick={pasoAnterior }
                        >
                            ← Volver
                        </button>

                    <button className="btn-siguiente"
                onClick={siguientePaso }

                    > Continuar →
                    </button>
                </div>
            </div>)
        }


            {paso === 3 && (
                <div className="paso-contenido" > <h2>Elige tu bebida</h2> <p className="paso-descripcion" > Acompaña tu banderilla con tu bebida favorita. </p> <div className="opciones-grid" > {
                    bebidas.map((bebida) => (
                        <button key={bebida.id}

                    className={bebidaSeleccionada?.id === bebida.id ?
                            "opcion-card seleccionada": "opcion-card"}
                    onClick={ () => seleccionarBebida(bebida)}>
                    <img src={bebida.imagen}
                    alt={bebida.nombre}/>
                    
                    <div className="opcion-info" >
                        <h3> {bebida.nombre}
                        </h3>
                        <strong> +${formatoPrecio(bebida.precio)}

                        </strong>
                    </div>
                </button>
                ))}

            </div>
                
                <div className="acciones" >
                    <button className="btn-volver"
                onClick={pasoAnterior}
                    > ← Volver </button>
                    
                    <button className="btn-siguiente"
                onClick={siguientePaso}
                        > Continuar →
                        </button>
                </div>
            </div>
        )}

            {paso === 4 && (
                <div className="paso-contenido" >
                <h2>Elige tu snack</h2>
                <p className="paso-descripcion" > Agrega algo dulce o crujiente para completar tu pedido. </p>
                    <div className="opciones-grid" > {snacks.map((snack) => (
                        <button key={snack.id}

                    className={snackSeleccionado?.id === snack.id ?
                        "opcion-card seleccionada": "opcion-card"}
                    onClick={() => seleccionarSnack(snack)} >
                    <img src={snack.imagen}
                        alt={snack.nombre}/>
                    <div className="opcion-info" >
                        <h3> {snack.nombre}
                        </h3>
                        <strong> +${formatoPrecio(snack.precio)}
                        </strong>
                    </div>
                </button>
                ))}
            
                </div>
                <div className="acciones" >
                    <button className="btn-volver"
                onClick={ pasoAnterior}
                    > ← Volve</button>

                    <button className="btn-siguiente"
                onClick={siguientePaso}

                    > Ver resumen → </button>
                </div>
            </div>
        )}


            {paso === 5 && (
                <div className="paso-contenido resumen" >
                <h2>Tu banderilla está lista 🎉</h2>
                <p className="paso-descripcion" > Revisa tu combinación antes de agregarla al carrito. </p>
                <div className="resumen-card" >
                    <img src={banderillaSeleccionada.imagen}
                alt={ banderillaSeleccionada.nombre}
                />
                    <div className="resumen-info" >
                        <h3> Tu banderilla personalizada </h3>
                        <p> <strong>Banderilla:</strong>{" "}
                {banderillaSeleccionada.nombre }
                        </p>
                        <p> <strong>Cobertura:</strong> {" "}
                        {coberturaSeleccionada.nombre}
                        </p>
                        <p> <strong>Bebida:</strong> {" "}
                                {bebidaSeleccionada
                                    ? bebidaSeleccionada.nombre
                                    : "Sin bebida"}

                        </p>
                        <p> <strong>Snack:</strong> {" "}
                                {snackSeleccionado
                                    ? snackSeleccionado.nombre
                                    : "Sin snack"}
                        </p>
                        <div className="total" > Total: <strong> ${
                        formatoPrecio(calcularTotal())}
                        </strong>
                        </div>
                    </div>
                </div>
                
                    <div className="acciones" >
                        <button className="btn-volver"
                        onClick={ pasoAnterior}

                > ← Volver </button>
                    <button className="btn-carrito"
                        onClick={agregarAlCarrito}
                    > 🛒 Agregar al carrito </button>
                </div>
            </div>
    )}

    </section>
    );
}

export default CrearBanderilla;