import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

import { movies } from "../src/data/movies.js";
import { moviesExtra } from "../src/data/moviesExtra.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = resolve(__dirname, "../src/data/db.json");

const db = {
  // Combine all movies into a single collection used by the admin CRUD UI
  movies: [...movies, ...moviesExtra],
  // Keep a separate collection if you ever want to access only the extra ones
  moviesExtra,
};

writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");

console.log(`db.json generated with ${movies.length} movies and ${moviesExtra.length} extra movies at ${dbPath}`);


