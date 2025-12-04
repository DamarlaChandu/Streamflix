import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DB_PATH = path.resolve(process.cwd(), 'src', 'data', 'db.json');

async function readDb() {
  const raw = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(raw);
}

async function writeDbAtomic(data) {
  const tmp = DB_PATH + '.tmp';
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf8');
  await fs.rename(tmp, DB_PATH);
}

// Movies
app.get('/movies', async (req, res) => {
  try {
    const db = await readDb();
    res.json(db.movies || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to read movies' });
  }
});

app.get('/movies/:id', async (req, res) => {
  try {
    const db = await readDb();
    const movie = (db.movies || []).find(m => String(m.id) === String(req.params.id));
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to read movie' });
  }
});

app.post('/movies', async (req, res) => {
  try {
    const db = await readDb();
    const movies = db.movies || [];
    const payload = req.body || {};

    // generate a simple unique id (string)
    const maxId = movies.reduce((max, m) => Math.max(max, Number(m.id) || 0), 0);
    const newId = String(maxId + 1 || Date.now());
    const newMovie = { id: newId, ...payload };

    movies.push(newMovie);
    db.movies = movies;
    await writeDbAtomic(db);
    res.status(201).json(newMovie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create movie' });
  }
});

app.put('/movies/:id', async (req, res) => {
  try {
    const id = String(req.params.id);
    const db = await readDb();
    const movies = db.movies || [];
    const idx = movies.findIndex(m => String(m.id) === id);
    if (idx === -1) return res.status(404).json({ message: 'Movie not found' });
    const updated = { ...movies[idx], ...req.body, id };
    movies[idx] = updated;
    db.movies = movies;
    await writeDbAtomic(db);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update movie' });
  }
});

app.delete('/movies/:id', async (req, res) => {
  try {
    const id = String(req.params.id);
    const db = await readDb();
    const movies = db.movies || [];
    const filtered = movies.filter(m => String(m.id) !== id);
    if (filtered.length === movies.length) return res.status(404).json({ message: 'Movie not found' });
    db.movies = filtered;
    await writeDbAtomic(db);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete movie' });
  }
});

// Users
app.get('/users', async (req, res) => {
  try {
    const db = await readDb();
    res.json(db.users || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to read users' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const db = await readDb();
    db.users = db.users || [];
    const { name, email, password, role = 'viewer' } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const exists = db.users.some(u => String(u.email).toLowerCase() === String(email).toLowerCase());
    if (exists) return res.status(409).json({ message: 'Email already exists' });

    const maxId = db.users.reduce((max, u) => Math.max(max, Number(u.id) || 0), 0);
    const newUser = { id: String(maxId + 1 || Date.now()), name, email, password, role };
    db.users.push(newUser);
    await writeDbAtomic(db);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

export default app;
