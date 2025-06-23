import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar({ sidebarOpen, toggleSidebar }) {
  const handleLogout = () => {
    // Tambahkan aksi logout di sini (contoh sederhana):
    localStorage.clear();
    window.location.href = "/"; // Redirect ke halaman login atau home
  };

  return (
    <header className="w-full flex items-center justify-between px-4 py-4 bg-white shadow-sm border-b border-b-gray-200">
      <button
        onClick={toggleSidebar}
        className="text-gray-700"
        aria-label="Toggle Sidebar"
      >
        <FiMenu size={24} />
      </button>

      <h1 className="text-lg font-semibold"></h1>

      <Link
        onClick={handleLogout}
        className="md:inline-block text-sm px-4 py-1 rounded text-white hover:bg-red-400 transition bg-red-500"
      >
        Logout
      </Link>
    </header>
  );
}
