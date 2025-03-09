import { useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import PublishersStore from "../stores/PublishersStore";

const Publishers = observer(() => {
  useEffect(() => {
    PublishersStore.fetchPublishers();
  }, [PublishersStore.page]);

  if (PublishersStore.loading) {
    return <p className="text-center text-lg mt-10 text-white">Cargando publishers...</p>;
  }

  if (!PublishersStore.publishers || PublishersStore.publishers.length === 0) {
    return <p className="text-center text-lg mt-10 text-red-500">No se encontraron publishers.</p>;
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-neon-blue">🏢 Publishers</h1>

      {/* Tarjetas de Publishers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PublishersStore.publishers.map((publisher) => (
          <Link
            to={`/publisher/${publisher.id}`}
            key={publisher.id}
            className="relative border border-gray-800 bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-neon-blue transition transform hover:-translate-y-1"
          >
            <h2 className="text-lg font-semibold text-center">{publisher.name}</h2>
            <p className="text-gray-400 text-center mt-2">
              🎮 Total de juegos: <span className="text-neon-blue">{publisher.games_count}</span>
            </p>

            {/* Efecto Neón */}
            <div className="absolute inset-0 rounded-lg border-2 border-transparent hover:border-neon-blue transition"></div>
          </Link>
        ))}
      </div>

      {/* 🔄 Controles de paginación */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => PublishersStore.setPage(PublishersStore.page - 1)}
          disabled={PublishersStore.page === 1}
          className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-md transition 
            hover:bg-neon-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⬅ Anterior
        </button>

        <span className="px-6 py-3 bg-gray-900 text-neon-blue font-bold rounded-full shadow-md">
          Página {PublishersStore.page} de {PublishersStore.totalPages}
        </span>

        <button
          onClick={() => PublishersStore.setPage(PublishersStore.page + 1)}
          disabled={PublishersStore.page === PublishersStore.totalPages}
          className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-md transition 
            hover:bg-neon-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
});

export default Publishers;
