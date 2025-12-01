import { useSearchParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { allMovies as movies } from "../data/allMovies";
import MovieCard from '../components/MovieCard';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.toLowerCase().includes(query.toLowerCase()) ||
      movie.director.toLowerCase().includes(query.toLowerCase()) ||
      movie.cast.some(actor => actor.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

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

