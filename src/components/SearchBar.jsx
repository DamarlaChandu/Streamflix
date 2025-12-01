import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { allMovies } from "../data/allMovies";   // correct import

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search filter fix — using allMovies instead of movies
  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = allMovies
        .filter(movie =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8); // You can increase results number
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (movie) => {
    navigate(`/movie/${movie.id}`);
    setQuery('');
    setShowSuggestions(false);
  };

  return (
    <form 
      ref={searchRef}
      onSubmit={handleSubmit}
      className="relative w-full max-w-md"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full px-4 py-2 bg-netflix-dark text-white rounded-lg 
                   border border-gray-700 focus:outline-none 
                   focus:border-netflix-red"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-netflix-dark 
                        border border-gray-700 rounded-lg shadow-xl 
                        max-h-80 overflow-y-auto z-50">
          {suggestions.map(movie => (
            <div
              key={movie.id}
              onClick={() => handleSuggestionClick(movie)}
              className="px-4 py-3 hover:bg-gray-800 cursor-pointer 
                         flex items-center gap-3"
            >
              <img 
                src={movie.poster || 'https://via.placeholder.com/50x75'} 
                className="w-12 h-16 object-cover rounded"
              />
              <div>
                <p className="text-white font-semibold">{movie.title}</p>
                <p className="text-gray-400 text-sm">{movie.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
