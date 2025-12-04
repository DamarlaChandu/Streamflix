import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WatchlistProvider } from './context/WatchlistContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/Watchlist';
import SearchResults from './pages/SearchResults';
import MoviesAdmin from './pages/MoviesAdmin';
import MovieForm from './pages/MovieForm';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <WatchlistProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin/movies"
              element={
                <ProtectedRoute requiredRole="admin">
                  <MoviesAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/movies/new"
              element={
                <ProtectedRoute requiredRole="admin">
                  <MovieForm mode="create" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/movies/:id/edit"
              element={
                <ProtectedRoute requiredRole="admin">
                  <MovieForm mode="edit" />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </WatchlistProvider>
  );
}

export default App;

