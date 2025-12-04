import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { allMovies } from "../data/allMovies";
import TrailerModal from './TrailerModal'; // You already have this

const HeroBanner = ({ movies = null }) => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    const source = movies && movies.length ? movies : allMovies;
    // Selecting only high-rated movies to display
    const topMovies = source.filter(m => m.rating >= 8.5);
    const randomMovie = topMovies[Math.floor(Math.random() * topMovies.length)];
    setFeaturedMovie(randomMovie);
  }, []);

  if (!featuredMovie) return null;

  return (
    <>
      {/* Trailer Popup Player */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerUrl={featuredMovie.trailerUrl}
      />

      <div className="relative h-[75vh] md:h-[85vh] w-full overflow-hidden">

        {/* Background Poster */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${featuredMovie.poster})` }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        <div className="relative z-10 h-full flex items-center px-6 md:px-14">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold">{featuredMovie.title}</h1>

            <p className="mt-3 text-lg opacity-90 line-clamp-3">
              {featuredMovie.description}
            </p>

            <p className="mt-3 text-yellow-400 font-semibold">
              ⭐ {featuredMovie.rating}  | {featuredMovie.year} | {featuredMovie.genre}
            </p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setIsTrailerOpen(true)}
                className="bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200"
              >
                ▶ Watch Trailer
              </button>

              <Link
                to={`/movie/${featuredMovie.id}`}
                className="bg-gray-700/80 text-white px-8 py-3 rounded font-bold hover:bg-gray-600"
              >
                ℹ More Info
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
