import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, User, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-purple-700">
          <Sparkles /> EventMaster
        </Link>
        
        <div className="hidden md:flex gap-8 text-gray-600 font-medium">
          <Link to="/" className="hover:text-purple-600 transition">Home</Link>
          <Link to="/vendors" className="hover:text-purple-600 transition">Find Vendors</Link>
        </div>

        <div className="flex gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              {/* Show Name */}
              <span className="text-sm font-bold text-gray-600 hidden md:block">
                Hi, {user.name}
              </span>
              
              {/* DIFFERENT BUTTONS FOR DIFFERENT ROLES */}
              {user.role === 'user' ? (
                // CUSTOMER SEES THIS
                <Link to="/user/profile" className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-purple-200 transition">
                  <User size={18} /> My Profile
                </Link>
              ) : (
                // VENDOR/ADMIN SEES THIS
                <Link 
                  to={user.role === 'vendor' ? "/vendor/dashboard" : "/admin/dashboard"}
                  className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-purple-200 transition"
                >
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
              )}
              
              <button 
                onClick={handleLogout}
                className="text-red-500 border border-red-200 px-3 py-2 rounded-lg hover:bg-red-50 transition"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-purple-700 border border-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition">
                Login
              </Link>
              <Link to="/login" className="bg-purple-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-800 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;