import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMovie, getMovieById, updateMovie } from "../api/moviesApi";

const emptyMovie = {
  title: "",
  year: "",
  genre: "",
  rating: "",
  language: "",
  poster: "",
  director: "",
  trailerUrl: "",
  description: "",
};

const MovieForm = ({ mode }) => {
  const isEdit = mode === "edit";
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(emptyMovie);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    const loadMovie = async () => {
      try {
        setLoading(true);
        const data = await getMovieById(id);
        setMovie({
          title: data.title ?? "",
          year: data.year ?? "",
          genre: data.genre ?? "",
          rating: data.rating ?? "",
          language: data.language ?? "",
          poster: data.poster ?? "",
          director: data.director ?? "",
          trailerUrl: data.trailerUrl ?? "",
          description: data.description ?? "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load movie.");
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...movie,
        year: movie.year ? Number(movie.year) : "",
        rating: movie.rating ? Number(movie.rating) : "",
      };

      let createdMovie;
      if (isEdit) {
        await updateMovie(id, payload);
      } else {
        createdMovie = await createMovie(payload);
      }

      // Signal other tabs/components that a movie was added
      if (createdMovie) {
        const key = 'movieAdded';
        const value = `${createdMovie.id}:${Date.now()}`;
        try {
          // storage event fires in other tabs; also dispatch an event locally for immediate update
          localStorage.setItem(key, value);
          window.dispatchEvent(new CustomEvent('movie:added', { detail: { id: createdMovie.id } }));
        } catch (err) {
          console.warn('Could not write movieAdded to localStorage', err);
        }
      }

      // navigate back to admin list and signal a refresh
      navigate("/admin/movies", { state: { refresh: Date.now() } });
    } catch (err) {
      console.error(err);
      setError("Failed to save movie. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="pt-24 px-4 md:px-10 text-white bg-netflix-black min-h-screen">
        <p>Loading movie...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 md:px-10 pb-10 bg-netflix-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">
        {isEdit ? "Edit Movie" : "Add New Movie"}
      </h1>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 max-w-2xl bg-gray-900 p-6 rounded-lg shadow-lg"
      >
        <div>
          <label className="block text-sm mb-1" htmlFor="title">
            Title *
          </label>
          <input
            id="title"
            name="title"
            value={movie.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-netflix-red"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1" htmlFor="year">
              Year *
            </label>
            <input
              id="year"
              name="year"
              type="number"
              value={movie.year}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-netflix-red"
            />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="rating">
              Rating *
            </label>
            <input
              id="rating"
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={movie.rating}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-netflix-red"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1" htmlFor="genre">
              Genre *
            </label>
            <input
              id="genre"
              name="genre"
              value={movie.genre}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-netflix-red"
            />
          </div>

          <div>
            <label className="block text-sm mb-1" htmlFor="language">
              Language
            </label>
            <input
              id="language"
              name="language"
              value={movie.language}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-netflix-red"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1" htmlFor="poster">
            Poster URL *
          </label>
          <input
            id="poster"
            name="poster"
            value={movie.poster}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-netflix-red"
          />
        </div>

        <div>
          <label className="block text-sm mb-1" htmlFor="director">
            Director
          </label>
          <input
            id="director"
            name="director"
            value={movie.director}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-netflix-red"
          />
        </div>

        <div>
          <label className="block text-sm mb-1" htmlFor="trailerUrl">
            Trailer URL
          </label>
          <input
            id="trailerUrl"
            name="trailerUrl"
            value={movie.trailerUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-netflix-red"
          />
        </div>

        <div>
          <label className="block text-sm mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={movie.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-netflix-red resize-none"
          />
        </div>

        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-netflix-red rounded font-semibold hover:bg-red-700"
        >
          {isEdit ? "Update Movie" : "Create Movie"}
        </button>
      </form>
    </div>
  );
};

export default MovieForm;


