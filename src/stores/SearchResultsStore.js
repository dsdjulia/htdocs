import { makeAutoObservable, runInAction } from "mobx";
import { searchGames, searchPublishers } from "../services/api";

class SearchResultsStore {
  games = [];
  publishers = [];
  page = 1;
  totalPagesGames = 5;
  totalPagesPublishers = 5;
  loading = true;
  query = '';

  constructor() {
    makeAutoObservable(this, {
      games: true,
      publishers: true,
      page: true,
      totalPagesGames: true,
      totalPagesPublishers: true,
      loading: true,
      query: true,
    });
  }

  async fetchResults(query, page = this.page) {
    try {
      runInAction(() => {
        this.loading = true;
        this.query = query;
      });

      const gamesData = await searchGames(query, page);
      const publishersData = await searchPublishers(query, page);

      runInAction(() => {
        this.games = gamesData.results || [];
        this.publishers = publishersData.results || [];
        this.totalPagesGames = gamesData?.count ? Math.ceil(gamesData.count / 20) : 1;
        this.totalPagesPublishers = publishersData?.count ? Math.ceil(publishersData.count / 20) : 1;
        this.loading = false;
      });

    } catch (error) {
      console.error("Error al obtener resultados:", error);
      runInAction(() => {
        this.games = [];
        this.publishers = [];
        this.loading = false;
      });
    }
  }

  setPage(newPage) {
    if (newPage < 1 || newPage > this.totalPagesGames) return;

    runInAction(() => {
      this.page = newPage;
    });

    this.fetchResults(this.query, newPage);
  }
}

export default new SearchResultsStore();
