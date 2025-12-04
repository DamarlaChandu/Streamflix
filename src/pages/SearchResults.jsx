import { useSearchParams, Link } from 'react-router-dom';
import { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getMovies } from '../api/moviesApi';
import MovieCard from '../components/MovieCard';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getMovies();
        if (mounted) setMovies(data || []);
      } catch (err) {
        console.error('Failed to load movies for search:', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return movies.filter(movie =>
      (movie.title || '').toLowerCase().includes(q) ||
      (movie.genre || '').toLowerCase().includes(q) ||
      (movie.director || '').toLowerCase().includes(q) ||
      (movie.cast || []).some(actor => (actor || '').toLowerCase().includes(q))
    );
  }, [query, movies]);

  return (
    <div className="min-h-screen bg-netflix-black text-white pt-20 px-4 md:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {query ? `Search Results for "${query}"` : 'Search Movies'}
        </h1>

        {!query ? (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-4">Enter a search term to find movies</p>
            <Link
              to="/"
              className="text-netflix-red hover:underline"
            >
              Go Back Home
            </Link>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-4">No movies found matching "{query}"</p>
            <Link
              to="/"
              className="text-netflix-red hover:underline"
            >
              Browse All Movies
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-400 mb-6">Found {results.length} result(s)</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {results.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

