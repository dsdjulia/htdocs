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

window.PublisherStore = PublisherStore;
window.HomeStore = HomeStore;
window.GameDetailStore = GameDetailStore;
window.FavoritesStore = FavoritesStore; 
window.GameStore = GameStore

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
