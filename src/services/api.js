import axios from "axios";

const API_KEY = "d6d5d9d60e374684a256aa96e4eec1d4";
const BASE_URL = "https://api.rawg.io/api/";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const getPopularGames = async (page = 1) => {
  try {
    const response = await api.get(`games?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los juegos populares:", error);
    return { results: [], count: 0 };
  }
};

export const getGameDetails = async (id) => {
  try {
    const response = await api.get(`games/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los detalles del juego:", error);
    return null;
  }
};

export const getGamesByTag = async (tag, page = 1) => {
  try {
    const response = await api.get(`games?tags=${tag}&page=${page}`);
    return response.data; // 🔴 Devuelve toda la data, no solo `results`
  } catch (error) {
    console.error("Error al obtener juegos por tag:", error);
    return { results: [], count: 0 }; // 🔴 Asegura que `count` no sea undefined
  }
};


export const getGamesByGenre = async (genre, page = 1) => {
  try {
    const response = await api.get(`games?genres=${genre}&page=${page}`);
    return response.data; // 🔴 Devuelve toda la data, no solo `results`
  } catch (error) {
    console.error("Error al obtener juegos por género:", error);
    return { results: [], count: 0 }; // 🔴 Asegura que `count` no sea undefined
  }
};


export const getPublisherDetails = async (id, page = 1) => {
  try {
    // 🔹 Obtener detalles del publisher
    const publisherResponse = await api.get(`/publishers/${id}`); // 🔥 Asegurarse de incluir `/`
    const publisher = publisherResponse.data;

    console.log("📢 Datos del publisher recibidos:", publisher);

    // 🔹 Obtener juegos publicados por este publisher con paginación
    const gamesResponse = await api.get(`/games?publishers=${id}&page=${page}`); // 🔥 También corregido
    const gamesData = gamesResponse.data;

    console.log("🎮 Juegos obtenidos:", gamesData.results);

    return { 
      ...publisher, 
      games: gamesData.results || [], 
      totalGames: gamesData.count || 0 
    };
  } catch (error) {
    console.error("❌ Error al obtener información del publisher:", error);
    return { games: [], totalGames: 0 }; // 🔴 Evita fallos si la API falla
  }
};





export const searchGames = async (query, page = 1) => {
  try {
    const response = await api.get(`games?search=${query}&page=${page}`);
    return response.data; // 🔴 Devuelve toda la data, no solo `results`
  } catch (error) {
    console.error("Error al buscar juegos:", error);
    return { results: [], count: 0 }; // 🔴 Evita fallos en la paginación
  }
};

export const searchPublishers = async (query, page = 1) => {
  try {
    const response = await api.get(`publishers?search=${query}&page=${page}`);
    return response.data; // 🔴 Devuelve toda la data, no solo `results`
  } catch (error) {
    console.error("Error al buscar publishers:", error);
    return { results: [], count: 0 }; // 🔴 Evita fallos en la paginación
  }
};


export const getAllPublishers = async (page = 1) => {
  try {
    const response = await api.get(`publishers?page=${page}`);
    return response.data; // 🔴 Devuelve toda la data, no solo `results`
  } catch (error) {
    console.error("Error al obtener publishers:", error);
    return { results: [], count: 0 }; // 🔴 Evita fallos en la paginación
  }
};

window.getPublisherDetails = getPublisherDetails; // ✅ Permite probarlo en la consola
