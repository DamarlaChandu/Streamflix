import { createContext, useContext, useEffect, useState } from "react";
import { getUsers } from '../api/moviesApi';

// Simple hardcoded users for demo / academic purposes.
// In a real app, you would verify these on a backend.
const USERS = [
  {
    email: "admin@streamflix.com",
    password: "admin123",
    role: "admin",
  },
  {
    email: "viewer@streamflix.com",
    password: "viewer123",
    role: "viewer",
  },
];

const STORAGE_KEY = "streamflix_auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { email, role } | null

  // Restore auth state from localStorage on first render
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.email && parsed?.role) {
          setUser(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to read auth from localStorage", e);
    }
  }, []);

  const login = async (email, password) => {
    // Check both the static demo users and any users registered in db.json
    try {
      const remote = await getUsers();
      const merged = [...USERS, ...(remote || [])];
      const found = merged.find(
        (u) => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
      );
      if (!found) return { success: false, message: 'Invalid email or password.' };
      const authUser = { email: found.email, role: found.role };
      setUser(authUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      return { success: true, role: found.role };
    } catch (err) {
      // fall back to static check if API fails
      const found = USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
      );
      if (!found) return { success: false, message: 'Invalid email or password.' };
      const authUser = { email: found.email, role: found.role };
      setUser(authUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      return { success: true, role: found.role };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    user,
    role: user?.role ?? null,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};


