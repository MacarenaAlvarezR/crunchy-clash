import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx"
import Home from "./pages/home.jsx";
import Products from "./components/products.jsx";
import CrearBanderilla from "./pages/crearBanderilla.jsx";
import Login from "./pages/login.jsx"
import Registro from "./pages/registro.jsx"
import Perfil from "./pages/perfil.jsx";
import MisPedidos from "./pages/misPedidos.jsx";
import Carrito from "./pages/carrito.jsx"
import Admin from "./pages/admin.jsx";
import Nosotros from "./pages/nosotros.jsx";
import Contacto from "./pages/contacto.jsx";
import Favoritos from "./pages/favoritos.jsx";

function App() {
  return (
    
      <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
       
        <Route path="/productos" element={<Products />} />

        <Route path="/crear-banderilla" element={<CrearBanderilla />} />

        <Route path="/login" element={<Login />} />

        <Route path="/registro" element={<Registro />} />

        <Route path="/perfil" element={<Perfil />} />

        <Route path="/mispedidos" element={<MisPedidos />} />
        
        <Route path="/carrito" element={<Carrito />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/nosotros" element={<Nosotros />} />

        <Route path="/contacto" element={<Contacto />} />

        <Route
          path="/favoritos"
          element={<Favoritos />}
        />

      </Routes>

      <Footer />
    </BrowserRouter >
  );
}

export default App;