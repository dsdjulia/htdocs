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
      console.log("📢 Fetching popular games...");

      runInAction(() => {
        this.loading = true; // ✅ Asegurar que se establece en true al iniciar la petición
      });

      const data = await getPopularGames();
      console.log("📊 Datos recibidos:", data);

      runInAction(() => {
        this.games = data?.results || [];
        this.loading = false; // ✅ Asegurar que se establece en false al finalizar
      });

      console.log("✅ Estado actualizado en MobX:", this.games, "Loading:", this.loading);
    } catch (error) {
      console.error("❌ Error al obtener juegos populares:", error);
      runInAction(() => {
        this.games = [];
        this.loading = false; // ✅ Asegurar que loading también cambia en caso de error
      });
    }
  }
}

export default new HomeStore();
