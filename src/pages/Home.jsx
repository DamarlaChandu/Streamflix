import { useMemo } from 'react';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';
import { allMovies as movies } from "../data/allMovies";


const Home = () => {
  const genres = useMemo(() => {
    const genreSet = new Set(movies.map(m => m.genre));
    return Array.from(genreSet);
  }, []);

  const getMoviesByGenre = (genre) => {
    return movies.filter(m => m.genre === genre);
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <HeroBanner />
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

