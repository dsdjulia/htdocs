import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//Para que sean accesibles en la consola:
import GameStore from "./stores/GameStore"
import FavoritesStore from "./stores/FavoritesStore";
import GameDetailStore from "./stores/GameDetailStore";
import HomeStore from "./stores/HomeStore";
import PublisherStore from "./stores/PublisherStore";

window.PublisherStore = PublisherStore; // ✅ Esto permite accederlo en consola
window.HomeStore = HomeStore; // 👈 Esto lo hace accesible en la consola
window.GameDetailStore = GameDetailStore; // 👈 Esto lo hace accesible en la consola
window.FavoritesStore = FavoritesStore; 
window.GameStore = GameStore

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
