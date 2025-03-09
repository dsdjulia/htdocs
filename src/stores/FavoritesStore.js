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
      this.favorites = storedFavorites; 
    });
  }

  addFavorite(game) {
    if (!this.favorites.some((fav) => fav.id === game.id)) {
      runInAction(() => {
        this.favorites.push(game);
      });
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    }
  }

  removeFavorite(gameId) {
    runInAction(() => {
      this.favorites = this.favorites.filter(game => game.id !== gameId);
    });
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }
}

export default new FavoritesStore();
