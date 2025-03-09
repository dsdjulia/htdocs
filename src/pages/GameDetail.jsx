import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getGameDetails } from "../services/api";
import { motion } from "framer-motion";

function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      const data = await getGameDetails(id);
      setGame(data);

      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setIsFavorite(favorites.some(fav => fav.id === data.id));
    };

    fetchGame();
  }, [id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      favorites = favorites.filter(fav => fav.id !== game.id);
    } else {
      favorites.push(game);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  if (!game) {
    return <p className="text-center text-lg mt-10">Cargando información del juego...</p>;
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${game.background_image})` }}
    >
      {/* Capa oscura para mejorar la visibilidad del contenido */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Contenido del juego */}
      <div className="relative z-10 p-6 max-w-5xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-4">{game.name}</h1>

        {/* 🔥 Botón de Favoritos */}
        <button
          onClick={toggleFavorite}
          className={`px-4 py-2 rounded-full font-semibold transition ${
            isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-gray-700 hover:bg-gray-800"
          }`}
        >
          {isFavorite ? "❤️ Quitar de Favoritos" : "🤍 Añadir a Favoritos"}
        </button>

        <img
          src={game.background_image}
          alt={game.name}
          className="w-full max-h-[500px] object-contain rounded-lg shadow-md mt-4"
        />

        <div className="mt-4 space-y-2">
          <p><strong>Géneros:</strong></p>
          <div className="flex flex-wrap gap-2 mt-2">
            {game.genres.map((genre) => (
              <Link
                to={`/genre/${genre.slug}`}
                key={genre.id}
                className="px-3 py-1 bg-green-500 text-white text-sm rounded-full shadow-md hover:bg-green-600 transition cursor-pointer"
              >
                {genre.name}
              </Link>
            ))}
          </div>

          <p><strong>Plataformas:</strong> {game.platforms.map((p) => p.platform.name).join(", ")}</p>

          <p><strong>Publisher:</strong></p>
          <div className="flex flex-wrap gap-2 mt-2">
            {game.publishers.length > 0 ? (
              <Link
                to={`/publisher/${game.publishers[0].id}`}
                className="px-3 py-1 bg-purple-500 text-white text-sm rounded-full shadow-md hover:bg-purple-600 transition cursor-pointer"
              >
                {game.publishers[0].name}
              </Link>
            ) : (
              <span className="text-gray-300">No disponible</span>
            )}
          </div>

          <p><strong>Tags:</strong></p>
          <div className="flex flex-wrap gap-2 mt-2">
            {game.tags.map((tag) => (
              <Link
                to={`/tag/${tag.slug}`}
                key={tag.id}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full shadow-md hover:bg-blue-600 transition cursor-pointer"
              >
                {tag.name}
              </Link>
            ))}
          </div>

          <p><strong>Fecha de lanzamiento:</strong> {game.released}</p>
          <p><strong>Puntuación:</strong> {game.rating} ⭐</p>
          <p className="mt-4 text-gray-200">{game.description_raw || "Descripción no disponible."}</p>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;
