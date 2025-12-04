import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (!result.success) {
      setError(result.message || "Login failed. Please try again.");
      return;
    }

    // Redirect based on role, as requested
    if (result.role === "admin") {
      navigate("/admin/movies", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  const accessMessage = location.state?.from
    ? "Please login to continue."
    : null;
  const infoMessage = location.state?.message ?? null;

  return (
    <div className="min-h-screen bg-netflix-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          StreamFlix Login
        </h1>

        {accessMessage && (
          <p className="mb-4 text-sm text-gray-300 text-center">
            {accessMessage}
          </p>
        )}
        {infoMessage && (
          <p className="mb-4 text-sm text-green-400 text-center">{infoMessage}</p>
        )}

        {error && (
          <p className="mb-4 text-sm text-red-400 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-netflix-red"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-netflix-red"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 px-4 py-2 bg-netflix-red rounded font-semibold hover:bg-red-700"
          >
            Login
          </button>
        </form>
        {/* New user link */}
        <p className="mt-4 text-center text-sm text-gray-300">
          New user?{' '}
          <Link to="/register" className="text-netflix-red hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


