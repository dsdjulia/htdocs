import { useEffect, useState } from "react";
import { getPopularGames } from "../services/api";
import GameSlider from "../components/Slider";

function Home() {
  const [games, setGames] = useState({ results: [] });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getPopularGames();
        console.log("📊 Juegos populares obtenidos en Home:", data);

        setGames(data || { results: [] });
      } catch (error) {
        console.error("❌ Error al obtener juegos populares:", error);
        setGames({ results: [] });
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-neon-blue">🎮 Juegos Populares</h1>
      
      {/* Slider de juegos */}
      <div className="max-w-5xl mx-auto">
        <GameSlider games={games} />
      </div>

      {/* 🔥 Sección Promocional */}
      <div className="mt-10 text-center">
        <h2 className="text-3xl font-bold text-neon-blue">🌟 Descubre Mundos, Vive Aventuras</h2>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-lg">
          Los videojuegos no solo son entretenimiento, son experiencias. Desde emocionantes batallas 
          hasta historias épicas, hay un mundo esperando ser explorado. ¡Sumérgete en la acción y 
          encuentra tu próximo juego favorito hoy mismo! 🚀🔥
        </p>
      </div>
    </div>
  );
}

export default Home;
