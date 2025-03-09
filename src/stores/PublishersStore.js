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

      console.log("📢 Fetching publishers data, Página:", this.page);
      
      const data = await getAllPublishers(this.page);
      console.log("📦 Datos recibidos en PublishersStore:", data);

      runInAction(() => {
        this.publishers = data.results || [];
        this.totalPages = data.count ? Math.ceil(data.count / 20) : 1;
        this.loading = false;
      });
      
    } catch (error) {
      console.error("❌ Error al obtener publishers:", error);
      runInAction(() => {
        this.publishers = [];
        this.loading = false;
      });
    }
  }

  setPage(newPage) {
    if (newPage < 1 || newPage > this.totalPages) return; // Evitar valores fuera de rango

    runInAction(() => {
      this.page = newPage;
    });

    this.fetchPublishers(); // Recargar los publishers al cambiar de página
  }
}

export default new PublishersStore();
