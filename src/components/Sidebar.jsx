import { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiHome,
  FiUsers,
  FiX,
  FiTrello,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

function SidebarItem({ icon, label, to, children }) {
  const [open, setOpen] = useState(false);

  const baseClass =
    "w-full flex items-center justify-between text-sm px-3 py-2 rounded-lg transition-colors";

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${baseClass} ${
            isActive
              ? "bg-gray-200 text-black font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>
      </NavLink>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-sm text-gray-800 px-3 py-2 hover:bg-gray-200 rounded-lg"
      >
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>
        {children && (open ? <FiChevronUp /> : <FiChevronDown />)}
      </button>
      {open && children && <div className="ml-6 space-y-1">{children}</div>}
    </div>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-sm transform transition-transform duration-300 ease-in-out
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
    >
      <div className="flex flex-col h-full p-4">
        {/* Header Sidebar */}
        <div className="flex items-center justify-between mb-6">
          <img src="/logo-web.png" className="h-8 md:h-8" alt="Logo" />
          <button
            onClick={onClose}
            className="text-red-600 md:hidden"
            aria-label="Close Sidebar"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Menu Navigasi */}
        <nav className="space-y-2">
          <SidebarItem icon={<FiHome />} label="Home" to="/" />
          <SidebarItem
            icon={<FiTrello />}
            label="Dashboard"
            to="/admin/dashboard"
          />
          <SidebarItem icon={<FiUsers />} label="Lowongan">
            <NavLink
              to="/admin/job/create"
              className={({ isActive }) =>
                `block py-2 px-2 rounded text-sm ${
                  isActive
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
            >
              Tambah Lowongan
            </NavLink>
          </SidebarItem>
        </nav>

        {/* Footer Sidebar */}
        <div className="mt-auto pt-6 border-t border-gray-200 text-xs text-gray-500 text-center">
          © 2025 JobsKu
        </div>
      </div>
    </aside>
  );
}
