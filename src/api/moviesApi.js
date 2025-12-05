import axios from "axios";

// Use Vite env var when deployed. In development fall back to localhost:5000.
// Deployed backend URL: https://streamflix-1-w8zn.onrender.com
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? "http://localhost:5000" : "https://streamflix-1-w8zn.onrender.com");

// Movies collection (from db.json -> "movies")
export const getMovies = async () => {
  const res = await axios.get(`${API_BASE_URL}/movies`);
  return res.data;
};

export const getMovieById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/movies/${id}`);
  return res.data;
};

export const createMovie = async (movie) => {
  const res = await axios.post(`${API_BASE_URL}/movies`, movie);
  return res.data;
};

export const updateMovie = async (id, movie) => {
  const res = await axios.put(`${API_BASE_URL}/movies/${id}`, movie);
  return res.data;
};

export const deleteMovie = async (id) => {
  await axios.delete(`${API_BASE_URL}/movies/${id}`);
};

// --- Users API ---
export const getUsers = async () => {
  const res = await axios.get(`${API_BASE_URL}/users`);
  return res.data;
};

export const registerUser = async (user) => {
  const res = await axios.post(`${API_BASE_URL}/users`, user);
  return res.data;
};

// Optional: moviesExtra collection
export const getExtraMovies = async () => {
  const res = await axios.get(`${API_BASE_URL}/moviesExtra`);
  return res.data;
};


