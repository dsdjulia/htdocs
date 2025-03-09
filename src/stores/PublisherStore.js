import { makeAutoObservable, runInAction, observable } from "mobx";
import { getPublisherDetails } from "../services/api";

class PublisherStore {
  games = observable.array([]);
  page = 1;
  totalPages = 5;
  publisher = null;
  loading = true;

  constructor() {
    makeAutoObservable(this, {
      games: true,
      publisher: true,
      loading: true,
      page: true,
      totalPages: true,
    });
  }

  async fetchPublisher(id, page = this.page) {
    try {
      runInAction(() => {
        this.loading = true;
      });

      console.log(`📢 Fetching publisher data for ID: ${id}, Página: ${page}`);
      
      const data = await getPublisherDetails(id, page);
      console.log("📦 Datos recibidos en PublisherStore:", data);

      runInAction(() => {
        this.games.replace(data.games);
        this.publisher = { 
          id: data.id,
          name: data.name,
          slug: data.slug,
          games_count: data.games_count,
          image_background: data.image_background,
        };
        this.totalPages = Math.ceil(data.totalGames / 20); // ✅ Se recalcula totalPages para evitar errores
        this.loading = false;
      });

      console.log("✅ Estado final en MobX:", this.games.slice(), this.publisher, "Loading:", this.loading);
    } catch (error) {
      console.error("❌ Error al obtener detalles del publisher:", error);
      runInAction(() => {
        this.games.replace([]);
        this.publisher = null;
        this.loading = false;
      });
    }
  }

  // 🔥 ✅ `setPage()` correctamente ubicado dentro de la clase `PublisherStore`
  setPage(newPage) {
    if (newPage < 1 || newPage > this.totalPages) return; // Evita valores fuera de rango

    runInAction(() => {
      this.page = newPage;
    });

    this.fetchPublisher(this.publisher?.id, newPage); // 🔥 Recargar los juegos con la nueva página
  }
}

export default new PublisherStore();
