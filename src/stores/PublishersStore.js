import { makeAutoObservable, runInAction } from "mobx";
import { getAllPublishers } from "../services/api";

class PublishersStore {
  publishers = [];
  page = 1;
  totalPages = 5;
  loading = true;

  constructor() {
    makeAutoObservable(this, {
      publishers: true,
      page: true,
      totalPages: true,
      loading: true,
    });
  }

  async fetchPublishers() {
    try {
      runInAction(() => {
        this.loading = true;
      });
      
      const data = await getAllPublishers(this.page);

      runInAction(() => {
        this.publishers = data.results || [];
        this.totalPages = data.count ? Math.ceil(data.count / 20) : 1;
        this.loading = false;
      });
      
    } catch (error) {
      console.error("Error al obtener publishers:", error);
      runInAction(() => {
        this.publishers = [];
        this.loading = false;
      });
    }
  }

  setPage(newPage) {
    if (newPage < 1 || newPage > this.totalPages) return;

    runInAction(() => {
      this.page = newPage;
    });

    this.fetchPublishers();
  }
}

export default new PublishersStore();
