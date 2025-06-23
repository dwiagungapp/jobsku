import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Api from "../../services/Api";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function Login() {
  const { user, login } = useAuth();
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
    setError("");
  };

  if (user) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Api.get("/sanctum/csrf-cookie");
      const res = await Api.post("/api/login", creds);
      login({ user: res.data.user, token: res.data.token });
    } catch (err) {
      console.error(err.response || err);
      if (err.response?.status === 422) {
        const msgs = Object.values(err.response.data.errors || {})
          .flat()
          .join(" ");
        setError(msgs);
      } else {
        setError(err.response?.data?.error || "Login gagal (server error)");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-blue-500 items-center justify-center">
      <div className="w-full max-w-xs bg-white rounded p-5 shadow-md">
        <header>
          <img
            className="w-30 h-10 mx-auto mb-5"
            src="/logo-web.png"
            alt="Logo"
          />
        </header>

        {error && (
          <div className="mb-4 text-red-700 bg-red-100 border border-red-200 p-2 rounded text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-200"
              type="email"
              name="email"
              value={creds.email}
              onChange={handleChange}
              placeholder="Masukkan email"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-200"
              type="password"
              name="password"
              value={creds.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-800"
              } text-white font-bold py-2 px-4 mb-6 rounded transition`}
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </div>
        </form>

        <footer className="flex justify-between text-sm">
          <Link
            to="/"
            className="inline-flex items-center text-indigo-700 hover:text-pink-700 transition"
          >
            <FiArrowLeft className="mr-2" /> Home
          </Link>
        </footer>
      </div>
    </div>
  );
}
