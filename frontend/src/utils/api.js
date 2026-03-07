// ============================================
// API CONFIGURATION
// ============================================

// Determine backend URL based on environment
const baseUrl = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://event-planner-9dgd.onrender.com';

export default baseUrl;
