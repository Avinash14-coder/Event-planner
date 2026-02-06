import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('user');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const availableRoles = isLoginMode ? ['user', 'vendor', 'admin'] : ['user', 'vendor'];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/signup';
    
    try {
      // Ensure this URL is correct for your backend
      const response = await fetch(`https://event-planner-9dgd.onrender.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: activeTab }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLoginMode) {
          toast.success(`Welcome back, ${data.user.name}!`);
          onLogin(data.user);
          if (data.user.role === 'vendor') navigate('/vendor/dashboard');
          else if (data.user.role === 'admin') navigate('/admin/dashboard');
          else navigate('/vendors');
        } else {
          toast.success("Account Created! Please Login.");
          setIsLoginMode(true);
          setFormData({ name: '', email: '', password: '' });
        }
      } else {
        setErrorMessage(data.error || "Authentication failed.");
      }
    } catch (error) {
      setErrorMessage("Server not reachable. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    // UPDATED: Berry Blush Gradient Background
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#6a2f49] via-[#b14e79] to-[#e0b8c9] animate-gradient-xy">
      
      {/* GLASSMORPHISM CARD */}
      <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl w-full max-w-lg overflow-hidden border border-white/50 relative">
        
        {/* UPDATED: Decorative Top Shape */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#b14e79] to-[#d095af]"></div>

        <div className="p-8 md:p-12">
          
          {/* Header */}
          <div className="text-center mb-8">
            {/* UPDATED: Icon Circle & Color */}
            <div className="w-16 h-16 bg-[#efdce4] rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
               <Sparkles className="text-[#b14e79]" size={32} />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              {isLoginMode ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-500">
              {isLoginMode ? "Enter your credentials to access your account." : "Join us to plan your perfect event."}
            </p>
          </div>

          {/* Role Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
            {availableRoles.map((role) => (
              <button 
                key={role} 
                onClick={() => setActiveTab(role)} 
                className={`flex-1 py-2 capitalize font-bold rounded-lg transition-all duration-300 text-sm ${
                  activeTab === role 
                    // UPDATED: Active Text Color
                    ? 'bg-white text-[#8e3e61] shadow-md transform scale-105' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-600 rounded-r flex items-center gap-3 text-sm font-medium animate-pulse">
              <AlertCircle size={18} /> {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLoginMode && (
              <div className="relative group">
                {/* UPDATED: Icon Focus Color */}
                <User className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#b14e79] transition" size={20} />
                <input 
                  name="name" type="text" placeholder="Full Name" required 
                  value={formData.name} onChange={handleChange} 
                  // UPDATED: Ring Focus Color
                  className="w-full pl-12 p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#b14e79] focus:bg-white transition" 
                />
              </div>
            )}
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#b14e79] transition" size={20} />
              <input 
                name="email" type="email" placeholder="Email Address" required 
                value={formData.email} onChange={handleChange} 
                className="w-full pl-12 p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#b14e79] focus:bg-white transition" 
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#b14e79] transition" size={20} />
              <input 
                name="password" type="password" placeholder="Password" required 
                value={formData.password} onChange={handleChange} 
                className="w-full pl-12 p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#b14e79] focus:bg-white transition" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              // UPDATED: Gradient Button & Shadow
              className="w-full bg-gradient-to-r from-[#b14e79] to-[#8e3e61] hover:from-[#8e3e61] hover:to-[#6a2f49] text-white font-bold py-4 rounded-xl transition shadow-lg shadow-[#b14e79]/20 flex justify-center items-center gap-2 transform active:scale-[0.98]"
            >
              {loading ? "Processing..." : (isLoginMode ? "Login" : "Sign Up Free")} 
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          {/* Footer Toggle */}
          <div className="text-center mt-8">
            <button 
              onClick={() => { 
                setIsLoginMode(!isLoginMode); 
                setActiveTab('user'); 
                setErrorMessage(""); 
              }} 
              // UPDATED: Hover Text Color
              className="text-gray-500 hover:text-[#8e3e61] font-bold transition text-sm"
            >
              {isLoginMode ? "New here? Create an account" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;