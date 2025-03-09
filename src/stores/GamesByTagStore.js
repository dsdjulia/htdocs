import { makeAutoObservable, runInAction } from "mobx";
import { getGamesByTag } from "../services/api";

class GamesByTagStore {
  games = [];
  page = 1;
  totalPages = 5;
  loading = true;
  tag = "";

  constructor() {
    makeAutoObservable(this);
  }

  async fetchGames(tag) {
    this.tag = tag;
    try {
      runInAction(() => {
        this.loading = true;
      });

      const data = await getGamesByTag(this.tag, this.page);

      runInAction(() => {
        this.games = data.results;
        this.totalPages = Math.ceil(data.count / 20);
        this.loading = false;
      });
    } catch (error) {
      console.error("Error al obtener juegos por tag:", error);
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
    this.fetchGames(this.tag);
  }
}

export default new GamesByTagStore();
