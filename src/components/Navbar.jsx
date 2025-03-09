import { Link } from "react-router-dom";
import SearchBar from "./SearchBar"; // 👈 Importamos la barra de búsqueda

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* 🔴 LOGO Y HOME */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition">
          🎮 Game Explorer
        </Link>

        {/* 🔹 ENLACES DE NAVEGACIÓN */}
        <div className="flex space-x-6">
          <Link to="/games" className="hover:text-gray-400 transition">🎮 Explorar Juegos</Link>
          <Link to="/publishers" className="hover:text-gray-400 transition">🏢 Publishers</Link>
          <Link to="/favorites" className="hover:text-gray-400 transition">⭐ Favoritos</Link>
        </div>

        {/* 🔍 BARRA DE BÚSQUEDA */}
        <SearchBar />
      </div>
    </nav>
  );
}

export default Navbar;
