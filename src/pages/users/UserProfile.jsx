import React, { useState, useEffect } from 'react';
import { Camera, Edit2, Save, X, User } from 'lucide-react';
import toast from 'react-hot-toast';

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profilePic || ""); // Local image state
  const [file, setFile] = useState(null); // File to upload

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  // Sync state when user logs in/updates
  useEffect(() => {
    if (user) {
      setProfileImage(user.profilePic);
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  // Handle File Selection (Live Preview)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProfileImage(URL.createObjectURL(selectedFile)); // Show immediately
    }
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('address', formData.address);
    if (file) {
      data.append('profilePic', file);
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
        
        // 2. Force Image Refresh (Timestamp Trick)
        if (updatedUser.profilePic) {
            setProfileImage(`${updatedUser.profilePic}?t=${Date.now()}`);
        }
        
        toast.success("Profile Updated Successfully!");
        setIsEditing(false);
        
        // 3. Reload to update Navbar avatar
        setTimeout(() => window.location.reload(), 800); 
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h1>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative">
        
        {/* Header Background */}
        <div className="h-48 bg-gradient-to-r from-purple-600 to-indigo-600 relative">
           <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        <div className="px-8 pb-8">
          <div className="relative -mt-20 mb-6 flex flex-col md:flex-row justify-between items-end gap-4">
            
            {/* PROFILE IMAGE SECTION */}
            <div className="relative group">
              <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg bg-white overflow-hidden flex items-center justify-center">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; }}
                  />
                ) : (
                  <User size={64} className="text-gray-300" />
                )}
              </div>

              {/* Camera Icon (Only visible when editing) */}
              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-purple-600 text-white p-2.5 rounded-full shadow-lg cursor-pointer hover:bg-purple-700 transition">
                  <Camera size={20} />
                  <input type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
                </label>
              )}
            </div>
            
            {/* Edit/Save Button */}
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`px-6 py-2.5 rounded-xl font-bold transition flex items-center gap-2 shadow-sm ${
                isEditing 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {isEditing ? <><Save size={18}/> Save Changes</> : <><Edit2 size={18}/> Edit Profile</>}
            </button>
          </div>

          {/* FORM SECTION */}
          <div className="space-y-6 max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <input 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  disabled={!isEditing} 
                  className={`w-full p-3 rounded-xl border ${isEditing ? 'border-purple-300 bg-purple-50 focus:ring-2 focus:ring-purple-500 outline-none' : 'bg-gray-50 border-transparent text-gray-600'}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                <input 
                  value={formData.phone} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  disabled={!isEditing} 
                  placeholder="+91..."
                  className={`w-full p-3 rounded-xl border ${isEditing ? 'border-purple-300 bg-purple-50 focus:ring-2 focus:ring-purple-500 outline-none' : 'bg-gray-50 border-transparent text-gray-600'}`} 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
              <input 
                value={user.email} 
                disabled 
                className="w-full p-3 rounded-xl border border-transparent bg-gray-100 text-gray-400 cursor-not-allowed" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Address</label>
              <textarea 
                value={formData.address} 
                onChange={(e) => setFormData({...formData, address: e.target.value})} 
                rows="3" 
                disabled={!isEditing} 
                placeholder="Enter your full address"
                className={`w-full p-3 rounded-xl border ${isEditing ? 'border-purple-300 bg-purple-50 focus:ring-2 focus:ring-purple-500 outline-none' : 'bg-gray-50 border-transparent text-gray-600'}`} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;