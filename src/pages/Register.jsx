import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, registerUser } from "../api/moviesApi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState("viewer"); // fixed default role
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!name.trim() || !email.trim() || !password) {
      setError("All fields are required.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    try {
      setLoading(true);

      // quick uniqueness check against backend
      const users = await getUsers();
      const exists = users.some(u => u.email?.toLowerCase() === email.toLowerCase());
      if (exists) {
        setError("This email is already registered. Try logging in or use a different email.");
        setLoading(false);
        return;
      }

      // Call backend to create user (the server also enforces uniqueness)
      await registerUser({ name: name.trim(), email: email.trim(), password, role });

      // success → redirect to login
      navigate("/login", { replace: true, state: { message: "Account created — please sign in." } });
    } catch (err) {
      console.error(err);
      // if server returned 409 use friendly message
      if (err?.response?.status === 409) {
        setError(err.response.data?.message || "Email already registered.");
      } else {
        setError("Failed to register. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Create an account</h1>

        {error && <p className="mb-4 text-sm text-red-400 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-netflix-red"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-netflix-red"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-netflix-red"
              placeholder="Enter a password (min 6 chars)"
            />
          </div>

          <div className="text-sm text-gray-400">Role: <strong className="text-white">{role}</strong></div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 px-4 py-2 bg-netflix-red rounded font-semibold hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-netflix-red hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
