import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getMovieById } from '../api/moviesApi';
import TrailerModal from "../components/TrailerModal";   // <-- Only using TrailerModal
import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";

const MovieDetails = () => {
  const { id } = useParams();
  const [showTrailer, setShowTrailer] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getMovieById(id);
        if (mounted) setMovie(data);
      } catch (err) {
        console.error('Failed to load movie details:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  // Fetch similar movies when movie loads
  useEffect(() => {
    if (!movie) return;
    let mounted = true;
    (async () => {
      try {
        const { getMovies } = await import('../api/moviesApi');
        const allMovies = await getMovies();
        if (mounted) {
          const similarList = (allMovies || [])
            .filter(m => m.genre === movie.genre && String(m.id) !== String(movie.id))
            .slice(0, 12);
          setSimilar(similarList);
        }
      } catch (err) {
        console.error('Failed to load similar movies:', err);
      }
    })();
    return () => { mounted = false; };
  }, [movie]);

  if (loading) return <p className="text-white text-center mt-40">Loading...</p>;
  if (!movie)
    return <h1 className="text-white text-center mt-40 text-5xl">Movie Not Found ❌</h1>;

  const inWatchlist = isInWatchlist(movie.id);

  return (
    <>
      {/* Trailer Modal (Works Now ✔) */}
      <TrailerModal
        isOpen={showTrailer}
        onClose={() => setShowTrailer(false)}
        trailerUrl={movie.trailerUrl}   // 🔥 Trailer plays correctly now
      />

      <div className="min-h-screen bg-black text-white">

        {/* --- Banner Section --- */}
        <div className="relative w-full h-[75vh] flex items-end">
          <img
            src={movie.poster}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover brightness-[65%]"
          />

          <div className="absolute bottom-24 left-10 max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-extrabold drop-shadow-xl"
            >
              {movie.title}
            </motion.h1>

            <p className="mt-3 text-gray-200 text-lg leading-relaxed">
              {movie.description}
            </p>

            <div className="mt-3 text-lg font-semibold text-yellow-400 flex items-center gap-2">
              ⭐ {movie.rating}  ·  {movie.year}  ·  {movie.genre}
              {movie.language && <span>🌍 {movie.language}</span>}
            </div>

            {/* --- Buttons --- */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowTrailer(true)}
                className="px-10 py-3 bg-white text-black font-bold text-lg rounded hover:bg-gray-200"
              >
                ▶ Play Trailer
              </button>

              <button
                onClick={() =>
                  inWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)
                }
                className={`px-10 py-3 text-lg font-bold rounded ${
                  inWatchlist ? "bg-gray-700" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {inWatchlist ? "✓ Added" : "+ Watchlist"}
              </button>
            </div>
          </div>
        </div>

        {/* --- Similar Movies --- */}
        <div className="px-10 py-10">
          <h2 className="text-3xl font-bold mb-6">Because you watched {movie.title}</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-5">
            {similar.map(m => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
