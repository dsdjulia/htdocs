import { makeAutoObservable, runInAction } from "mobx";
import { getGameDetails } from "../services/api";

class GameDetailStore {
  game = null;
  isFavorite = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchGame(id) {
    try {
      const data = await getGameDetails(id);
      console.log("📦 Datos completos del juego:", data); // ✅ Verifica qué datos devuelve la API
      runInAction(() => {
        this.game = {
          id: data.id,
          name: data.name,
          background_image: data.background_image,
          description: data.description_raw,
          genres: data.genres, // ✅ Asegurar que se guarden los géneros
          tags: data.tags, // ✅ Guardar etiquetas
          publishers: data.publishers, // ✅ Guardar publishers
          rating: data.rating, // ✅ Guardar valoración
        };
        this.checkIfFavorite(id);
      });
    } catch (error) {
      console.error("❌ Error al obtener detalles del juego:", error);
    }
  }

  checkIfFavorite(id) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    this.isFavorite = favorites.some((game) => game.id === id);
  }

  toggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (this.isFavorite) {
      const updatedFavorites = favorites.filter((game) => game.id !== this.game.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      favorites.push(this.game);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    runInAction(() => {
      this.isFavorite = !this.isFavorite;
    });
  }
}

export default new GameDetailStore();
