import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import GamesByTagStore from "../stores/GamesByTagStore";

const GamesByTag = observer(() => {
  const { tag } = useParams();

  useEffect(() => {
    GamesByTagStore.fetchGames(tag);
  }, [tag]);

  if (GamesByTagStore.loading) {
    return <p className="text-center text-lg mt-10 text-white">Cargando juegos...</p>;
  }

  if (!GamesByTagStore.games.length) {
    return <p className="text-center text-lg mt-10 text-red-500">No se encontraron juegos con esta etiqueta.</p>;
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-neon-blue">
        🎮 Juegos etiquetados como "{tag}"
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {GamesByTagStore.games.map((game) => (
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
          </Link>
        ))}
      </div>

      {/* 🔄 Controles de paginación */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => GamesByTagStore.setPage(GamesByTagStore.page - 1)}
          disabled={GamesByTagStore.page === 1}
          className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-md transition 
            hover:bg-neon-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⬅ Anterior
        </button>

        <span className="px-6 py-3 bg-gray-900 text-neon-blue font-bold rounded-full shadow-md">
          Página {GamesByTagStore.page} de {GamesByTagStore.totalPages}
        </span>

        <button
          onClick={() => GamesByTagStore.setPage(GamesByTagStore.page + 1)}
          disabled={GamesByTagStore.page === GamesByTagStore.totalPages}
          className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-md transition 
            hover:bg-neon-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
});

export default GamesByTag;
