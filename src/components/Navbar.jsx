import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo - Berry Blush 600 */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-[#8e3e61]">
            <Sparkles size={28} className="fill-current" />
            <span>EventMaster</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
            <Link to="/" className="hover:text-[#b14e79] transition">Home</Link>
            <Link to="/vendors" className="hover:text-[#b14e79] transition">Find Vendors</Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-[#b14e79] font-bold">Hi, {user.name}</span>
                <button onClick={onLogout} className="bg-red-50 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-[#b14e79] font-bold hover:bg-[#f7edf2] px-4 py-2 rounded-lg transition">
                  Login
                </Link>
                {/* Sign Up Button - Berry Blush 500 */}
                <Link to="/login" className="bg-[#b14e79] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-[#8e3e61] transition shadow-lg shadow-[#b14e79]/20">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
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
              <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-600 py-2 hover:text-[#b14e79]">Home</Link>
              <Link to="/vendors" onClick={() => setIsOpen(false)} className="text-gray-600 py-2 hover:text-[#b14e79]">Find Vendors</Link>
              
              {user ? (
                <>
                  <div className="text-[#b14e79] font-bold py-2">Hi, {user.name}</div>
                  <button onClick={onLogout} className="text-red-500 font-bold py-2">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-[#b14e79] font-bold py-2">Login</Link>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="bg-[#b14e79] text-white py-3 rounded-lg font-bold">Sign Up Free</Link>
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