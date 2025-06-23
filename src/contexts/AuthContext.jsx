// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cek localStorage/token waktu app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // bisa fetch profil di sini, tapi contoh kita simpan langsung
      setUser({ role: "admin" });
    }
    setLoading(false);
  }, []);

  const login = ({ token }) => {
    localStorage.setItem("token", token);
    setUser({ role: "admin" });
    navigate("/admin/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook helper
export function useAuth() {
  return useContext(AuthContext);
}
