import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { searchGames, searchPublishers } from "../services/api";

function SearchResults() {
  const { query } = useParams();
  const [games, setGames] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPagesGames, setTotalPagesGames] = useState(5);
  const [totalPagesPublishers, setTotalPagesPublishers] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const gamesData = await searchGames(query, page);
        const publishersData = await searchPublishers(query, page);

        console.log("📊 Juegos obtenidos en búsqueda:", gamesData.results);
        console.log("🏢 Publishers obtenidos en búsqueda:", publishersData.results);

        setGames(gamesData.results || []);
        setPublishers(publishersData.results || []);
        setTotalPagesGames(gamesData?.count ? Math.ceil(gamesData.count / 20) : 1);
        setTotalPagesPublishers(publishersData?.count ? Math.ceil(publishersData.count / 20) : 1);
      } catch (error) {
        console.error("❌ Error en la búsqueda:", error);
        setGames([]);
        setPublishers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, page]);

  if (loading) {
    return <p className="text-center text-lg mt-10 text-white">Buscando resultados...</p>;
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-neon-blue">🔍 Resultados para "{query}"</h1>

      {/* 🎮 Juegos */}
      <h2 className="text-3xl font-semibold mt-6 text-neon-green">🎮 Juegos</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.length > 0 ? (
          games.map((game) => (
            <Link
              to={`/game/${game.id}`}
              key={game.id}
              className="relative border border-gray-800 bg-gray-900 p-4 rounded-lg shadow-lg hover:shadow-neon-green transition transform hover:-translate-y-1"
            >
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2 text-center">{game.name}</h2>

              {/* Efecto Neón */}
              <div className="absolute inset-0 rounded-lg border-2 border-transparent hover:border-neon-green transition"></div>
            </Link>
          ))
        ) : (
          <p className="text-gray-400">No se encontraron juegos.</p>
        )}
      </div>

      {/* 🔄 Paginación de Juegos */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-md transition 
            hover:bg-neon-green disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⬅ Anterior
        </button>

        <span className="px-6 py-3 bg-gray-900 text-neon-green font-bold rounded-full shadow-md">
          Página {page} de {totalPagesGames}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPagesGames}
          className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-md transition 
            hover:bg-neon-green disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente ➡
        </button>
      </div>

      {/* 🏢 Publishers */}
      <h2 className="text-3xl font-semibold mt-12 text-neon-blue">🏢 Publishers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishers.length > 0 ? (
          publishers.map((publisher) => (
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
          ))
        ) : (
          <p className="text-gray-400">No se encontraron publishers.</p>
        )}
      </div>

      {/* 🔄 Paginación de Publishers */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-md transition 
            hover:bg-neon-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⬅ Anterior
        </button>

        <span className="px-6 py-3 bg-gray-900 text-neon-blue font-bold rounded-full shadow-md">
          Página {page} de {totalPagesPublishers}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPagesPublishers}
          className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-md transition 
            hover:bg-neon-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
}

export default SearchResults;
