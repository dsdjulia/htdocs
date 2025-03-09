import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import FavoritesStore from "../stores/FavoritesStore";

const Favorites = observer(() => {
  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-neon-blue">Juegos Favoritos</h1>

      {FavoritesStore.favorites.length === 0 ? (
        <p className="text-center text-lg text-red-500">No tienes juegos favoritos aún.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {FavoritesStore.favorites.map((game) => (
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
      )}
    </div>
  );
});

export default Favorites;
