import { useMemo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';
import { getMovies } from '../api/moviesApi';

const Home = () => {
  const location = useLocation();
  const message = location.state?.message;

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getMovies();
        if (mounted) setMovies(data || []);
      } catch (err) {
        console.error('Failed to load movies for home:', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // reload when a new movie is added elsewhere (other tab or admin)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'movieAdded') {
        (async () => {
          try {
            const data = await getMovies();
            setMovies(data || []);
          } catch (err) {
            console.error('Failed to reload movies after update:', err);
          }
        })();
      }
    };
    const onCustom = () => {
      (async () => {
        try {
          const data = await getMovies();
          setMovies(data || []);
        } catch (err) {
          console.error('Failed to reload movies after update:', err);
        }
      })();
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('movie:added', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('movie:added', onCustom);
    };
  }, []);

  const genres = useMemo(() => {
    const genreSet = new Set(movies.map(m => m.genre));
    return Array.from(genreSet);
  }, [movies]);

  const getMoviesByGenre = (genre) => {
    return movies.filter(m => m.genre === genre);
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      {message && (
        <div className="pt-20 px-4">
          <div className="max-w-3xl mx-auto mb-4 rounded bg-yellow-600/20 border border-yellow-500/60 text-yellow-100 px-4 py-2 text-sm">
            {message}
          </div>
        </div>
      )}
      <HeroBanner movies={movies} />
      <div className="mt-8 pb-12">
        {genres.map((genre) => (
          <MovieRow
            key={genre}
            title={genre}
            movies={getMoviesByGenre(genre)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

