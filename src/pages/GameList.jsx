import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import GameStore from "../stores/GameStore";

const GameList = () => { // ❌ Quitamos el `observer()` aquí
  useEffect(() => {
    GameStore.fetchGames();
  }, []);

  if (GameStore.loading) {
    return <p className="text-center text-lg mt-10 text-white">Cargando juegos...</p>;
  }

  if (!GameStore.games || GameStore.games.length === 0) {
    return <p className="text-center text-lg mt-10 text-red-500">No se encontraron juegos.</p>;
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-neon-blue">🎮 Explorar Juegos</h1>

      {/* Tarjetas de Juegos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {GameStore.games.map((game) => (
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

      {/* 🔄 Controles de paginación */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => GameStore.setPage(GameStore.page - 1)}
          disabled={GameStore.page === 1}
          className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-md transition 
            hover:bg-neon-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⬅ Anterior
        </button>

        <span className="px-6 py-3 bg-gray-900 text-neon-blue font-bold rounded-full shadow-md">
          Página {GameStore.page} de {GameStore.totalPages}
        </span>

        <button
          onClick={() => GameStore.setPage(GameStore.page + 1)}
          disabled={GameStore.page === GameStore.totalPages}
          className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-md transition 
            hover:bg-neon-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
};

export default observer(GameList);
