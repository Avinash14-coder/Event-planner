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
        const response = await fetch(`https://event-planner-9dgd.onrender.com/api/vendors/my-services/${user._id}`);
        const data = await response.json();
        setMyServices(data);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyServices();
  }, []);

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
      const response = await fetch(`https://event-planner-9dgd.onrender.com/api/users/${user._id}`, {
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

  const handleDeleteService = async (id) => {
    if(!confirm("Delete this service?")) return;
    setMyServices(myServices.filter(s => s._id !== id));
    toast.success("Service removed.");
  };

  return (
    <div className="container mx-auto px-6 py-8">
      
      {/* --- PROFILE HEADER --- */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 mb-10 flex flex-col md:flex-row items-center md:items-start gap-8 relative">
        
        {/* Profile Picture */}
        <div className="relative group">
          <img 
            src={profileImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
            alt="Vendor Profile" 
            className="w-32 h-32 rounded-full object-cover border-4 border-purple-100 bg-white shadow-sm"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; }}
          />
          <button 
             onClick={() => setShowEditModal(true)}
             className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition"
             title="Change Photo"
          >
            <Camera size={16} />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center md:justify-start gap-3">
            {user?.name}
            <button onClick={() => setShowEditModal(true)} className="text-gray-400 hover:text-purple-600 transition">
              <Edit2 size={20} />
            </button>
          </h1>
          <p className="text-gray-500 mt-1">{user?.email}</p>
          <p className="text-gray-500">{user?.phone || "No phone number added"}</p>
        </div>

        {/* Stats */}
        <div className="text-center md:text-right pt-4 md:pt-0 md:pl-8">
          <div className="text-3xl font-bold text-purple-600">{myServices.length}</div>
          <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Active Services</div>
        </div>
      </div>

      {/* --- SERVICES --- */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Services</h2>
        <Link to="/vendor/add-service" className="bg-purple-600 text-white px-5 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-purple-700 transition">
          <PlusCircle size={20} /> Add Service
        </Link>
      </div>

      {loading ? <div className="text-center py-10">Loading...</div> : myServices.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
           <p className="text-gray-400 mb-4">No services listed yet.</p>
           <Link to="/vendor/add-service" className="text-purple-600 font-bold hover:underline">List your first service</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myServices.map((service) => (
            <div key={service._id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition border border-gray-100 overflow-hidden">
              <div className="h-48 overflow-hidden relative bg-gray-100">
                <img 
                  src={service.images[0] || "broken"} 
                  alt={service.name} 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.target.onerror = null; e.target.src = getFallbackImage(service.type); }}
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-700">{service.type}</div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800">{service.name}</h3>
                <p className="text-sm text-gray-500 mb-4 flex items-center gap-1"><MapPin size={14}/> {service.location}</p>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="font-bold text-purple-600">₹{service.price}</span>
                  <button onClick={() => handleDeleteService(service._id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- EDIT MODAL --- */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Edit Business Profile</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 text-center">
                {profileImage && <img src={profileImage} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-purple-200"/>}
                <label className="block text-sm font-bold text-purple-800 mb-2 cursor-pointer bg-white py-2 rounded border border-purple-200 hover:bg-purple-50">
                  Choose New Photo
                  <input type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
                </label>
                <p className="text-xs text-gray-500">Supports JPG, PNG</p>
              </div>
              <div><label className="block text-sm font-bold text-gray-700 mb-1">Business Name</label><input type="text" value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" /></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label><input type="text" value={editFormData.phone} onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" /></div>
              <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition mt-2">Save & Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;