import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, LayoutDashboard, Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-cyan-400 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent select-none"
          onClick={() => setMenuOpen(false)}
        >
          GuruX
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 hover:text-slate-900 transition"
          >
            <Home className="w-5 h-5" />
            Home
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 hover:text-slate-900 transition"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-md hover:bg-cyan-400 hover:text-slate-900 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-800 px-6 pb-4 space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 hover:text-slate-900 transition"
            onClick={() => setMenuOpen(false)}
          >
            <Home className="w-5 h-5" />
            Home
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 hover:text-slate-900 transition"
            onClick={() => setMenuOpen(false)}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
