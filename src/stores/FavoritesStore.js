import { makeAutoObservable } from "mobx";

class FavoritesStore {
  favorites = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFavorites(); // Cargar favoritos al iniciar
  }

  loadFavorites() {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    this.favorites = storedFavorites;
  }

  addFavorite(game) {
    this.favorites.push(game);
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  removeFavorite(gameId) {
    this.favorites = this.favorites.filter(game => game.id !== gameId);
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }
}

export default new FavoritesStore();
