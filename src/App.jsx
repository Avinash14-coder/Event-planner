import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 

// --- LAYOUTS ---
import PublicLayout from './layouts/PublicLayout';        
import DashboardLayout from './layouts/DashboardLayout'; 

// --- PUBLIC PAGES ---
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import CategoryHub from './pages/public/CategoryHub';          // Level 1: Category Hub
import SubCategoryListing from './pages/public/SubCategoryListing'; // Level 2: Sub-category List
import VendorDetails from './pages/public/VendorDetails';    // Final Level: Details

// --- USER PAGES ---
import UserProfile from './pages/users/UserProfile';

// --- VENDOR PAGES ---
import VendorDashboard from './pages/vendor/VendorDashboard';
import AddService from './pages/vendor/AddService';

// --- ADMIN PAGES ---
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* =========================================================
            PUBLIC LAYOUT ROUTES 
           ========================================================= */}
        <Route element={<PublicLayout user={user} onLogout={handleLogout} />}>
          
          <Route path="/" element={<Home />} />
          
          {/* LEVEL 1: e.g., /category/birthday -> Shows the Birthday Hub page */}
          <Route path="/category/:categoryName" element={<CategoryHub />} />

          {/* LEVEL 2: e.g., /category/birthday/services/cakeshop -> Shows Cake Shops */}
          <Route path="/category/:categoryName/services/:serviceType" element={<SubCategoryListing />} />

          {/* FINAL LEVEL: Single Vendor Details */}
          <Route path="/vendors/:id" element={<VendorDetails />} />
          
          {/* Protected User Profile */}
          <Route path="/user/profile" element={
            user && user.role === 'user' ? <UserProfile user={user} /> : <Navigate to="/login" />
          } />

          <Route path="/login" element={
            user ? (
              <Navigate to={
                user.role === 'vendor' ? "/vendor/dashboard" : 
                user.role === 'admin' ? "/admin/dashboard" : 
                "/user/profile"
              } />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } />
        </Route>

        {/* =========================================================
            VENDOR DASHBOARD ROUTES (Protected)
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
            ADMIN DASHBOARD ROUTES (Protected)
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

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;