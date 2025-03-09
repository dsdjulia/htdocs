import { makeAutoObservable, runInAction} from "mobx";
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
      runInAction(() => {
        this.loading = true;
      });

      const data = await getPopularGames(this.page);

      runInAction(() => {
        this.games = data.results;
        this.totalPages = Math.ceil(data.count / 20);
        this.loading = false;
      });
    } catch (error) {
      console.error("Error al obtener juegos:", error);
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
    this.fetchGames();
  }
}

export default new GameStore();
