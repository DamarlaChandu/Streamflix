import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../api/moviesApi";

const MoviesAdmin = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await getMovies();
      setMovies(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load movies from JSON Server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  // Refresh when navigated back from create/edit form
  const location = useLocation();
  useEffect(() => {
    if (location.state?.refresh) {
      loadMovies();
    }
  }, [location.state]);

  // listen to movie events from other tabs / windows
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'movieAdded') loadMovies();
    };
    const onCustom = () => loadMovies();
    window.addEventListener('storage', onStorage);
    window.addEventListener('movie:added', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('movie:added', onCustom);
    };
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete movie. Please try again.");
    }
  };

  return (
    <div className="pt-24 px-4 md:px-10 pb-10 bg-netflix-black min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Movies (CRUD)</h1>
        <Link
          to="/admin/movies/new"
          className="px-4 py-2 bg-netflix-red rounded font-semibold hover:bg-red-700"
        >
          + Add Movie
        </Link>
      </div>

      {loading && <p>Loading movies...</p>}
      {error && <p className="text-red-400 mb-4">{error}</p>}

      {!loading && movies.length === 0 && (
        <p>No movies found. Try adding one.</p>
      )}

      {!loading && movies.length > 0 && (
        <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-3 py-2 text-left">ID</th>
                <th className="px-3 py-2 text-left">Title</th>
                <th className="px-3 py-2 text-left">Year</th>
                <th className="px-3 py-2 text-left">Genre</th>
                <th className="px-3 py-2 text-left">Rating</th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id} className="border-t border-gray-800">
                  <td className="px-3 py-2">{movie.id}</td>
                  <td className="px-3 py-2">{movie.title}</td>
                  <td className="px-3 py-2">{movie.year}</td>
                  <td className="px-3 py-2">{movie.genre}</td>
                  <td className="px-3 py-2">{movie.rating}</td>
                  <td className="px-3 py-2 space-x-2">
                    <Link
                      to={`/admin/movies/${movie.id}/edit`}
                      className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MoviesAdmin;


