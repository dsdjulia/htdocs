import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import FavoritesStore from "../stores/FavoritesStore";
import GameDetailStore from "../stores/GameDetailStore";

const GameDetail = observer(() => {
  const { id } = useParams();

  useEffect(() => {
    GameDetailStore.fetchGame(id);
  }, [id]);

  if (!GameDetailStore.game) {
    return <p className="text-center text-lg mt-10 text-white">Cargando detalles del juego...</p>;
  }

  const isFavorite = FavoritesStore.favorites.some(fav => fav.id === GameDetailStore.game.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      FavoritesStore.removeFavorite(GameDetailStore.game.id);
    } else {
      FavoritesStore.addFavorite(GameDetailStore.game);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-neon-blue drop-shadow-lg">
        {GameDetailStore.game.name}
      </h1>

      <div className="flex justify-center">
        <motion.img
          src={GameDetailStore.game.background_image}
          alt={GameDetailStore.game.name}
          className="w-full md:w-2/3 lg:w-1/2 rounded-lg shadow-xl border border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <p className="mt-6 text-lg text-gray-300 leading-relaxed border-l-4 border-neon-blue pl-4">
        {GameDetailStore.game.description}
      </p>

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-neon-blue border-b-2 border-gray-700 pb-2">
          Géneros
        </h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {GameDetailStore.game.genres.map((genre) => (
            <Link
              key={genre.id}
              to={`/genre/${genre.slug}`}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-neon-blue transition"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-neon-blue border-b-2 border-gray-700 pb-2">
          Etiquetas
        </h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {GameDetailStore.game.tags.map((tag) => (
            <Link
              key={tag.id}
              to={`/tag/${tag.slug}`}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-neon-blue transition"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-neon-blue border-b-2 border-gray-700 pb-2">
          Publisher
        </h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {GameDetailStore.game.publishers.map((publisher) => (
            <Link
              key={publisher.id}
              to={`/publisher/${publisher.slug}`}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-neon-blue transition"
            >
              {publisher.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-neon-blue border-b-2 border-gray-700 pb-2">
          Valoración
        </h2>
        <p className="text-lg text-gray-400">{GameDetailStore.game.rating} / 5</p>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleToggleFavorite}
          className={`px-6 py-3 rounded-full text-white font-bold transition ${
            isFavorite ? "bg-red-500" : "bg-gray-800 hover:bg-neon-blue"
          }`}
        >
          {isFavorite ? "❤️ Quitar de Favoritos" : "💙 Agregar a Favoritos"}
        </button>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-neon-blue text-lg hover:underline">
          ⬅ Volver a la lista de juegos
        </Link>
      </div>
    </div>
  );
});

export default GameDetail;
