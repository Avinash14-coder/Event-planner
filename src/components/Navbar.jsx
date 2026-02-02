import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
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
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-purple-600 font-bold hover:bg-purple-50 px-4 py-2 rounded-lg transition">
                  Login
                </Link>
                <Link to="/login" className="bg-purple-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-200">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button (Visible ONLY on Mobile) */}
          <button 
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