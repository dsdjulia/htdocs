import { makeAutoObservable, runInAction } from "mobx";

class FavoritesStore {
  favorites = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFavorites();
  }

  loadFavorites() {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    runInAction(() => {
      this.favorites = storedFavorites; // Ahora MobX detectará este cambio
    });
  }

  addFavorite(game) {
    // Asegurarse de que el juego no esté ya en la lista de favoritos
    if (!this.favorites.some((fav) => fav.id === game.id)) {
      runInAction(() => {
        this.favorites.push(game); // Usar runInAction para que MobX lo detecte
      });
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    }
  }

  removeFavorite(gameId) {
    runInAction(() => {
      this.favorites = this.favorites.filter(game => game.id !== gameId); // Asegurarse de que MobX lo detecte
    });
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }
}

export default new FavoritesStore();
