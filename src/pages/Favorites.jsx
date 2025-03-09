import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-neon-blue">💖 Juegos Favoritos</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No tienes juegos en favoritos.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((game) => (
            <Link
              to={`/game/${game.id}`}
              key={game.id}
              className="relative border border-gray-800 bg-gray-900 p-4 rounded-lg shadow-lg hover:shadow-neon-blue transition transform hover:-translate-y-1"
            >
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2 text-center">{game.name}</h2>

              {/* Efecto Neón */}
              <div className="absolute inset-0 rounded-lg border-2 border-transparent hover:border-neon-blue transition"></div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
