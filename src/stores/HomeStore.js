import { makeAutoObservable, runInAction } from "mobx";
import { getPopularGames } from "../services/api";

class HomeStore {
  games = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchGames() {
    try {
      runInAction(() => {
        this.loading = true;
      });

      const data = await getPopularGames();

      runInAction(() => {
        this.games = data?.results || [];
        this.loading = false;
      });

    } catch (error) {
      console.error("Error al obtener juegos populares:", error);
      runInAction(() => {
        this.games = [];
        this.loading = false;
      });
    }
  }
}

export default new HomeStore();
