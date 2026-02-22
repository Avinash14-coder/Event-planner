import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-white"
          >
            <Sparkles size={28} />
            <span>EVENTRA</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-medium text-white">
            <Link to="/" className="hover:text-[#b14e79] transition">
              Home
            </Link>

            <Link to="/vendors" className="hover:text-[#b14e79] transition">
              Find Vendors
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-[#b14e79] font-bold">
                  Hi, {user.name}
                </span>

                <button
                  onClick={onLogout}
                  className="bg-red-50 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-[#b14e79] font-bold hover:bg-[#b14e79]/10 px-4 py-2 rounded-lg transition"
                >
                  Login
                </Link>

                <Link
                  to="/login"
                  className="bg-[#b14e79] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-[#8e3e61] transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-4 text-center">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#b14e79]"
              >
                Home
              </Link>

              <Link
                to="/vendors"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#b14e79]"
              >
                Find Vendors
              </Link>

              {user ? (
                <>
                  <div className="text-[#b14e79] font-bold">
                    Hi, {user.name}
                  </div>

                  <button onClick={onLogout} className="text-red-500 font-bold">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-[#b14e79] font-bold"
                  >
                    Login
                  </Link>

                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="bg-[#b14e79] text-white py-2 rounded-lg font-bold"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
