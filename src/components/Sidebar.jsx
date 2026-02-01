import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, LogOut, Settings, User } from 'lucide-react';

const Sidebar = ({ role, user, onLogout }) => {
  const location = useLocation();

  // Define menu items based on Role
  const vendorLinks = [
    { name: 'Dashboard', path: '/vendor/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Add Service', path: '/vendor/add-service', icon: <PlusCircle size={20} /> },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Manage Users', path: '/admin/users', icon: <User size={20} /> },
  ];

  const links = role === 'vendor' ? vendorLinks : adminLinks;

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shadow-sm">
      
      {/* 1. Logo Area */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
          {role === 'vendor' ? 'V' : 'A'}
        </div>
        <span className="text-xl font-bold text-gray-800">
          {role === 'vendor' ? 'Vendor Panel' : 'Admin Panel'}
        </span>
      </div>

      {/* 2. User Info (Mini Profile) */}
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
          <img 
            src={user?.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold text-gray-800 truncate">{user?.name}</h4>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* 3. Navigation Links */}
      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${
                isActive 
                  ? 'bg-purple-50 text-purple-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* 4. Logout Button (The Fix) */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={onLogout} // <--- THIS TRIGGERS THE LOGOUT IN APP.JSX
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;