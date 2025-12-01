import MovieCard from "../components/MovieCard";
import { useWatchlist } from "../context/WatchlistContext";

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="pt-24 px-10 text-white bg-netflix-black min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Your Watchlist ({watchlist.length})</h1>

      {watchlist.length === 0 && (
        <p className="text-gray-400 text-lg">No movies added yet.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {watchlist.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
