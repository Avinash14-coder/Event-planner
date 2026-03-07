import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, MapPin, Trash2, Edit2, X, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

// Helper for fallback images
const getFallbackImage = (category) => {
  switch (category?.toLowerCase()) {
    case 'dj': return "https://images.unsplash.com/photo-1571266028243-371695039980?auto=format&fit=crop&q=80&w=600";
    case 'catering': return "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600";
    case 'lawn': return "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600";
    case 'photographer': return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600";
    default: return "https://images.unsplash.com/photo-1514525253440-b39345208668?auto=format&fit=crop&q=80&w=600";
  }
};

const VendorDashboard = () => {
  // Load User from LocalStorage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  
  // Local state for the Profile Image (Source of Truth)
  const [profileImage, setProfileImage] = useState(user?.profilePic || "");

  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFile, setEditFile] = useState(null); 
  const [editFormData, setEditFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || ''
  });

  // DYNAMIC URL SETUP (Ensures it talks to your local backend when testing)
  const baseUrl = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://event-planner-9dgd.onrender.com";

  // Sync state when user changes (e.g. after save)
  useEffect(() => {
    if (user) {
      setProfileImage(user.profilePic);
      setEditFormData({ name: user.name, phone: user.phone });
    }
  }, [user]);

  // Fetch Services
  useEffect(() => {
    const fetchMyServices = async () => {
      if (!user?._id) return;
      try {
        const response = await fetch(`${baseUrl}/api/vendors/my-services/${user._id}`);
        const data = await response.json();
        setMyServices(data);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyServices();
  }, [user?._id, baseUrl]);

  // Handle File Selection (Live Preview)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFile(file);
      setProfileImage(URL.createObjectURL(file)); // Show preview immediately
    }
  };

  // Save Profile Changes
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', editFormData.name);
    data.append('phone', editFormData.phone);
    if (editFile) {
      data.append('profilePic', editFile);
    }

    try {
      const response = await fetch(`${baseUrl}/api/users/${user._id}`, {
        method: 'PUT',
        body: data 
      });

      if (response.ok) {
        const updatedUser = await response.json();
        
        // 1. Update Local Storage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // 2. Update Component State
        setUser(updatedUser); 
        
        // 3. Force Image Update (Add timestamp to bypass cache)
        if (updatedUser.profilePic) {
            setProfileImage(`${updatedUser.profilePic}?t=${Date.now()}`);
        }

        setShowEditModal(false);
        toast.success("Profile Updated Successfully!");

        // 4. Reload page to update Sidebar/Navbar
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  // --- DELETE SERVICE LOGIC ---
  const handleDeleteService = async (id) => {
    if(!confirm("Are you sure you want to permanently delete this service?")) return;
    
    try {
      const response = await fetch(`${baseUrl}/api/vendors/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setMyServices(myServices.filter(s => s._id !== id));
        toast.success("Service permanently removed.");
      } else {
        // Super Debugging
        const errorText = await response.text();
        console.error("Delete Error:", errorText);
        toast.error(`Delete Failed (${response.status}). Make sure local backend is running!`);
      }
    } catch (error) {
      toast.error("Server Error while deleting. Is your backend on?");
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 transition-colors duration-300">
      
      {/* --- PROFILE HEADER --- */}
      <div className="dark:bg-[#111622] bg-white rounded-2xl shadow-md border dark:border-white/5 border-gray-100 p-8 mb-10 flex flex-col md:flex-row items-center md:items-start gap-8 relative transition-colors duration-300">
        
        {/* Profile Picture */}
        <div className="relative group flex-shrink-0">
          <img 
            src={profileImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
            alt="Vendor Profile" 
            className="w-32 h-32 rounded-full object-cover border-4 dark:border-[#231018] border-[#f7edf2] dark:bg-[#190b11] bg-white shadow-sm"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; }}
          />
          <button 
             onClick={() => setShowEditModal(true)}
             className="absolute bottom-0 right-0 bg-[#b14e79] text-white p-2.5 rounded-full shadow-lg hover:bg-[#8e3e61] transition border-2 border-white dark:border-[#111622]"
             title="Change Photo"
          >
            <Camera size={16} />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold dark:text-white text-gray-800 flex items-center justify-center md:justify-start gap-3">
            {user?.name}
            <button onClick={() => setShowEditModal(true)} className="dark:text-gray-400 text-gray-400 hover:text-[#b14e79] dark:hover:text-[#b14e79] transition">
              <Edit2 size={20} />
            </button>
          </h1>
          <p className="dark:text-gray-400 text-gray-500 mt-1">{user?.email}</p>
          <p className="dark:text-gray-400 text-gray-500">{user?.phone || "No phone number added"}</p>
        </div>

        {/* Stats */}
        <div className="text-center md:text-right pt-4 md:pt-0 md:pl-8">
          <div className="text-3xl font-bold text-[#b14e79]">{myServices.length}</div>
          <div className="text-xs dark:text-gray-500 text-gray-500 font-bold uppercase tracking-wider">Active Services</div>
        </div>
      </div>

      {/* --- SERVICES --- */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white text-gray-800">My Services</h2>
        <Link to="/vendor/add-service" className="bg-[#b14e79] text-white px-5 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#8e3e61] transition">
          <PlusCircle size={20} /> Add Service
        </Link>
      </div>

      {loading ? <div className="text-center py-10 dark:text-gray-400">Loading...</div> : myServices.length === 0 ? (
        <div className="text-center py-12 dark:bg-[#111622] bg-gray-50 rounded-xl border-2 border-dashed dark:border-white/10 border-gray-200">
           <p className="dark:text-gray-400 text-gray-400 mb-4">No services listed yet.</p>
           <Link to="/vendor/add-service" className="text-[#b14e79] font-bold hover:underline">List your first service</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myServices.map((service) => (
            <div key={service._id} className="dark:bg-[#111622] bg-white rounded-xl shadow-sm hover:shadow-lg transition border dark:border-white/5 border-gray-100 overflow-hidden">
              <div className="h-48 overflow-hidden relative dark:bg-[#0a0d14] bg-gray-100">
                <img 
                  src={service.images[0] || "broken"} 
                  alt={service.name} 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.target.onerror = null; e.target.src = getFallbackImage(service.type); }}
                />
                <div className="absolute top-2 right-2 dark:bg-[#0a0d14]/90 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold dark:text-gray-300 text-gray-700 border dark:border-white/10">{service.type}</div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg dark:text-white text-gray-800">{service.name}</h3>
                <p className="text-sm dark:text-gray-400 text-gray-500 mb-4 flex items-center gap-1"><MapPin size={14}/> {service.location}</p>
                <div className="flex justify-between items-center pt-3 border-t dark:border-white/5 border-gray-100">
                  <span className="font-bold text-[#b14e79]">₹{service.price}</span>
                  <button onClick={() => handleDeleteService(service._id)} className="text-red-400 hover:text-red-600 p-2 dark:hover:bg-red-900/20 hover:bg-red-50 rounded-full transition"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- EDIT MODAL --- */}
      {showEditModal && (
        <div className="fixed inset-0 dark:bg-black/70 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="dark:bg-[#111622] bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border dark:border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold dark:text-white text-gray-800">Edit Business Profile</h3>
              <button onClick={() => setShowEditModal(false)} className="dark:text-gray-400 text-gray-400 hover:text-gray-600 dark:hover:text-white"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="dark:bg-[#0a0d14] bg-[#f7edf2] p-4 rounded-lg border dark:border-white/5 border-[#e0b8c9] text-center">
                {profileImage && <img src={profileImage} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 dark:border-white/10 border-[#e0b8c9]"/>}
                <label className="block text-sm font-bold text-[#b14e79] mb-2 cursor-pointer dark:bg-[#111622] bg-white py-2 rounded border dark:border-white/10 border-[#e0b8c9] dark:hover:bg-[#1e2638] hover:bg-[#f7edf2] transition">
                  Choose New Photo
                  <input type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
                </label>
                <p className="text-xs dark:text-gray-500 text-gray-500">Supports JPG, PNG</p>
              </div>
              <div><label className="block text-sm font-bold dark:text-gray-300 text-gray-700 mb-1">Business Name</label><input type="text" value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} className="w-full p-3 dark:bg-[#05070a] bg-white border dark:border-white/10 dark:text-white rounded-lg focus:ring-2 focus:ring-[#b14e79] outline-none" /></div>
              <div><label className="block text-sm font-bold dark:text-gray-300 text-gray-700 mb-1">Phone Number</label><input type="text" value={editFormData.phone} onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})} className="w-full p-3 dark:bg-[#05070a] bg-white border dark:border-white/10 dark:text-white rounded-lg focus:ring-2 focus:ring-[#b14e79] outline-none" /></div>
              <button type="submit" className="w-full bg-[#b14e79] hover:bg-[#8e3e61] text-white font-bold py-3 rounded-lg transition mt-2">Save & Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;