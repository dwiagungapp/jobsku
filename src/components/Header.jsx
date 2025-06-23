import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/cari-lowongan", label: "Lowongan" },
  ];

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-30 h-10 flex items-center justify-center">
            <img src="/logo-web.png" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-gray-600 hover:text-indigo-600 font-medium transition ${
                  isActive ? "text-indigo-600" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Auth & CTA */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <Link
              to="/login"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/admin/dashboard"
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Dashboard
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-inner">
          <nav className="flex flex-col space-y-1 px-6 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block text-gray-700 hover:text-indigo-600 font-medium py-2 transition ${
                    isActive ? "text-indigo-600" : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {!user ? (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-4 block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Dashboard
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
