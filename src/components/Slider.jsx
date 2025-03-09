import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function GameSlider({ games }) {
  // 🔴 Extraemos `results`, si no existe, usamos un array vacío
  const gameList = games?.results ?? [];

  // 🔴 Si `gameList` está vacío, mostramos un mensaje de carga
  if (gameList.length === 0) {
    return <p className="text-center text-gray-500">Cargando juegos populares...</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings} className="w-full">
      {gameList.map((game) => (
        <div key={game.id} className="p-2">
          <Link to={`/game/${game.id}`} className="block">
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-60 object-cover rounded-xl hover:opacity-80 transition"
            />
            <h2 className="text-lg font-semibold mt-2 text-center">{game.name}</h2>
          </Link>
        </div>
      ))}
    </Slider>
  );
}

export default GameSlider;
