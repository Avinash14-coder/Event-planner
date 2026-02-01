import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // <--- NEW: For Beautiful Alerts

// --- LAYOUTS ---
import PublicLayout from './layouts/PublicLayout';       
import DashboardLayout from './layouts/DashboardLayout'; 

// --- PUBLIC PAGES ---
import Home from './pages/public/Home';
import VendorList from './pages/public/VendorList';
import VendorDetails from './pages/public/VendorDetails';
import Login from './pages/public/Login';

// --- USER PAGES ---
import UserProfile from './pages/users/UserProfile';

// --- VENDOR PAGES ---
import VendorDashboard from './pages/vendor/VendorDashboard';
import AddService from './pages/vendor/AddService';

// --- ADMIN PAGES ---
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  // State to hold current logged-in user info
  const [user, setUser] = useState(null);

  // 1. Check LocalStorage on Load (Keep user logged in on refresh)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 2. Login Handler
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // 3. Logout Handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      {/* GLOBAL TOAST NOTIFICATIONS (Popups) */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        
        {/* =========================================================
            PUBLIC LAYOUT ROUTES 
            (Navbar + Footer logic handled inside PublicLayout) 
           ========================================================= */}
        <Route element={<PublicLayout user={user} onLogout={handleLogout} />}>
          
          {/* General Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/vendors" element={<VendorList />} />
          <Route path="/vendors/:id" element={<VendorDetails />} />
          
          {/* USER PROFILE (Protected: Only for 'user' role) */}
          <Route path="/user/profile" element={
            user && user.role === 'user' ? <UserProfile user={user} /> : <Navigate to="/login" />
          } />

          {/* LOGIN PAGE (With Smart Redirect) */}
          <Route path="/login" element={
            user ? (
              // If already logged in, redirect based on role
              <Navigate to={
                user.role === 'vendor' ? "/vendor/dashboard" : 
                user.role === 'admin' ? "/admin/dashboard" : 
                "/vendors" // Users go to the service list to shop
              } />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } />
        </Route>

        {/* =========================================================
            VENDOR DASHBOARD ROUTES 
            (Sidebar Layout) - Only for Vendors 
           ========================================================= */}
        <Route path="/vendor" element={
          user && user.role === 'vendor' ? (
            <DashboardLayout role="vendor" user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }>
           <Route path="dashboard" element={<VendorDashboard />} />
           <Route path="add-service" element={<AddService />} />
        </Route>

        {/* =========================================================
            ADMIN DASHBOARD ROUTES 
            (Sidebar Layout) - Only for Admins 
           ========================================================= */}
        <Route path="/admin" element={
          user && user.role === 'admin' ? (
            <DashboardLayout role="admin" user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }>
           <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Catch-all: Redirect unknown URLs to Home */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;