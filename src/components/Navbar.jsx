import { Link } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { watchlist } = useWatchlist();

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-netflix-black to-transparent px-4 md:px-8 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto gap-4">
        <Link to="/" className="text-netflix-red text-3xl font-bold flex-shrink-0">
          StreamFlix
        </Link>
        
        <div className="flex-1 max-w-md">
          <SearchBar />
        </div>
        
        <div className="flex items-center gap-6 flex-shrink-0">
          <Link 
            to="/" 
            className="text-white hover:text-gray-300 transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/watchlist" 
            className="text-white hover:text-gray-300 transition-colors relative"
          >
            Watchlist
            {watchlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-netflix-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {watchlist.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

