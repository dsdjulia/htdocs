import { makeAutoObservable, runInAction } from "mobx";
import { getGamesByGenre } from "../services/api";

class GamesByGenreStore {
  games = [];
  page = 1;
  totalPages = 5;
  loading = true;
  genre = "";

  constructor() {
    makeAutoObservable(this);
  }

  async fetchGames(genre) {
    this.genre = genre;
    try {
      runInAction(() => {
        this.loading = true;
      });

      const data = await getGamesByGenre(this.genre, this.page);

      runInAction(() => {
        this.games = data.results;
        this.totalPages = Math.ceil(data.count / 20);
        this.loading = false;
      });
    } catch (error) {
      console.error("❌ Error al obtener juegos por género:", error);
      runInAction(() => {
        this.games = [];
        this.loading = false;
      });
    }
  }

  setPage(newPage) {
    runInAction(() => {
      this.page = newPage;
    });
    this.fetchGames(this.genre);
  }
}

export default new GamesByGenreStore();
