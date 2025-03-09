import { makeAutoObservable } from "mobx";
import { getPopularGames } from "../services/api";

class GameStore {
  games = [];
  page = 1;
  totalPages = 5;
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchGames() {
    try {
      this.loading = true;
      const data = await getPopularGames(this.page);

      console.log("📦 Datos recibidos en GameStore:", data);
      this.games = data.results;
      this.totalPages = Math.ceil(data.count / 20);
    } catch (error) {
      console.error("❌ Error al obtener juegos:", error);
      this.games = [];
    } finally {
      this.loading = false;
    }
  }

  setPage(newPage) {
    this.page = newPage;
    this.fetchGames(); // Recargar juegos al cambiar de página
  }
}

export default new GameStore();
