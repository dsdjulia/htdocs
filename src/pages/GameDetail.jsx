import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FavoritesStore from "../stores/FavoritesStore";
import { getGameDetails } from "../services/api";

const GameDetail = observer(() => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      const gameData = await getGameDetails(id);
      setGame(gameData);
    };
    fetchGame();
  }, [id]);

  if (!game) {
    return <p>Loading...</p>;
  }

  // Verifica si el juego está en los favoritos
  const isFavorite = FavoritesStore.favorites.some(fav => fav.id === game.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      FavoritesStore.removeFavorite(game.id);  // Si ya está en favoritos, lo eliminamos
    } else {
      FavoritesStore.addFavorite(game);  // Si no está, lo agregamos a favoritos
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-neon-blue">{game.name}</h1>
      <img
        src={game.background_image}
        alt={game.name}
        className="w-full h-64 object-cover rounded-md"
      />
      <div className="text-center mt-4">
        <button
          onClick={handleToggleFavorite}
          className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-md transition 
            hover:bg-neon-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isFavorite ? "Eliminar de Favoritos" : "Agregar a Favoritos"}
        </button>
      </div>
      <p className="mt-4">{game.description}</p>
      {/* Puedes agregar más detalles del juego aquí */}
    </div>
  );
});

export default GameDetail;
