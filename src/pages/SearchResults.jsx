import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import SearchResultsStore from "../stores/SearchResultsStore";

const SearchResults = observer(() => {
  const { query } = useParams();

  useEffect(() => {
    SearchResultsStore.fetchResults(query);
  }, [query]);

  if (SearchResultsStore.loading) {
    return <p className="text-center text-lg mt-10 text-white">Buscando resultados...</p>;
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-neon-blue">🔍 Resultados para "{query}"</h1>

      {/* 🎮 Juegos */}
      <h2 className="text-3xl font-semibold mt-6 text-neon-green">🎮 Juegos</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {SearchResultsStore.games.length > 0 ? (
          SearchResultsStore.games.map((game) => (
            <Link
              to={`/game/${game.id}`}
              key={game.id}
              className="relative border border-gray-800 bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-neon-blue transition transform hover:-translate-y-1"
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
          ))
        ) : (
          <p className="text-gray-400">No se encontraron juegos.</p>
        )}
      </div>

      {/* 🔄 Paginación de Juegos */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => SearchResultsStore.setPage(SearchResultsStore.page - 1)}
          disabled={SearchResultsStore.page === 1}
          className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-md transition 
            hover:bg-neon-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⬅ Anterior
        </button>

        <span className="px-6 py-3 bg-gray-900 text-neon-blue font-bold rounded-full shadow-md">
          Página {SearchResultsStore.page} de {SearchResultsStore.totalPagesGames}
        </span>

        <button
          onClick={() => SearchResultsStore.setPage(SearchResultsStore.page + 1)}
          disabled={SearchResultsStore.page === SearchResultsStore.totalPagesGames}
          className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-md transition 
            hover:bg-neon-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente ➡
        </button>
      </div>

      {/* 🏢 Publishers */}
      <h2 className="text-3xl font-semibold mt-6 text-neon-green">🏢 Publishers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SearchResultsStore.publishers.length > 0 ? (
          SearchResultsStore.publishers.map((publisher) => (
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
          onClick={() => SearchResultsStore.setPage(SearchResultsStore.page - 1)}
          disabled={SearchResultsStore.page === 1}
          className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-md transition 
            hover:bg-neon-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⬅ Anterior
        </button>

        <span className="px-6 py-3 bg-gray-900 text-neon-blue font-bold rounded-full shadow-md">
          Página {SearchResultsStore.page} de {SearchResultsStore.totalPagesPublishers}
        </span>

        <button
          onClick={() => SearchResultsStore.setPage(SearchResultsStore.page + 1)}
          disabled={SearchResultsStore.page === SearchResultsStore.totalPagesPublishers}
          className="px-6 py-3 bg-gray-800 text-white rounded-full shadow-md transition 
            hover:bg-neon-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
});

export default SearchResults;
