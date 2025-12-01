import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWatchlist } from '../context/WatchlistContext';

const MovieCard = ({ movie }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const toggleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    inWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group cursor-pointer"
    >
      <Link to={`/movie/${movie.id}`}>
        <div className="relative rounded-lg overflow-hidden shadow-lg">

          {/* Movie Poster */}
          <img 
            src={movie.poster}
            alt={movie.title}
            className="w-full h-64 object-cover transition group-hover:scale-110 duration-300"
            onError={(e) => e.target.src = "https://via.placeholder.com/300x450?text=Image+NA"}
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

          {/* Movie Info */}
          <div className="absolute bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <h3 className="text-sm font-bold text-white truncate">{movie.title}</h3>
            <p className="text-xs text-gray-300 flex gap-2">
              ⭐ {movie.rating} <span>•</span> {movie.year}
            </p>
          </div>

          {/* Watchlist Button */}
          <button 
            onClick={toggleWatchlist}
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold transition ${
              inWatchlist ? "bg-gray-700" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {inWatchlist ? "✓ Saved" : "+ Watch"}
          </button>

        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
