import { movies } from "./movies"; 
import { moviesExtra } from "./moviesExtra";

export const allMovies = [
  ...movies.map(m => ({ ...m, poster: m.poster || "/fallback.jpg" })),
  ...moviesExtra.map(m => ({ ...m, poster: m.poster || "/fallback.jpg" }))
];
