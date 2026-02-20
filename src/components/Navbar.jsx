import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
<<<<<<< Updated upstream
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-purple-600">
            <Sparkles size={28} />
            <span>EventMaster</span>
          </Link>

          {/* Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
            <Link to="/" className="hover:text-purple-600 transition">Home</Link>
            <Link to="/vendors" className="hover:text-purple-600 transition">Find Vendors</Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-purple-600 font-bold">Hi, {user.name}</span>
                <button onClick={onLogout} className="bg-red-50 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition">
=======
          {/* Logo - Berry Blush 600 */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-white"
          >
            <Sparkles size={28} className="fill-current" />
            <span>EVENTRA</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-medium text-white text-xl font-extrabold">
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
>>>>>>> Stashed changes
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
<<<<<<< Updated upstream
                <Link to="/login" className="text-purple-600 font-bold hover:bg-purple-50 px-4 py-2 rounded-lg transition">
                  Login
                </Link>
                <Link to="/login" className="bg-purple-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-200">
=======
                <Link
                  to="/login"
                  className="text-balck font-bold hover:bg-[#b14e79] px-4 py-2 rounded-lg transition"
                >
                  Login
                </Link>
                {/* Sign Up Button - Berry Blush 500 */}
                <Link
                  to="/login"
                  className="bg-[#b14e79] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-[#8e3e61] transition shadow-lg shadow-[#b14e79]/20"
                >
>>>>>>> Stashed changes
                  Sign Up
                </Link>
              </div>
            )}
          </div>

<<<<<<< Updated upstream
          {/* Mobile Menu Button (Visible ONLY on Mobile) */}
          <button 
=======
          {/* Mobile Menu Button */}
          <button
>>>>>>> Stashed changes
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 animate-fade-in-down">
            <div className="flex flex-col space-y-4 mt-4 text-center">
<<<<<<< Updated upstream
              <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-600 py-2 hover:text-purple-600">Home</Link>
              <Link to="/vendors" onClick={() => setIsOpen(false)} className="text-gray-600 py-2 hover:text-purple-600">Find Vendors</Link>
              
              {user ? (
                <>
                  <div className="text-purple-600 font-bold py-2">Hi, {user.name}</div>
                  <button onClick={onLogout} className="text-red-500 font-bold py-2">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-purple-600 font-bold py-2">Login</Link>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="bg-purple-600 text-white py-3 rounded-lg font-bold">Sign Up Free</Link>
=======
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-gray-600 py-2 hover:text-[#b14e79]"
              >
                Home
              </Link>
              <Link
                to="/vendors"
                onClick={() => setIsOpen(false)}
                className="text-gray-600 py-2 hover:text-[#b14e79]"
              >
                Find Vendors
              </Link>

              {user ? (
                <>
                  <div className="text-[#b14e79] font-bold py-2">
                    Hi, {user.name}
                  </div>
                  <button
                    onClick={onLogout}
                    className="text-red-500 font-bold py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-[#b14e79] font-bold py-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="bg-[#b14e79] text-white py-3 rounded-lg font-bold"
                  >
                    Sign Up Free
                  </Link>
>>>>>>> Stashed changes
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
