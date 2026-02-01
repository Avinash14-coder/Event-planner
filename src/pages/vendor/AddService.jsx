import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddService = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null); // File state

  const [formData, setFormData] = useState({
    name: '', type: 'DJ', price: '', location: '', description: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = JSON.parse(localStorage.getItem('user'));
    
    // Use FormData for file upload
    const data = new FormData();
    data.append('name', formData.name);
    data.append('type', formData.type);
    data.append('price', formData.price);
    data.append('location', formData.location);
    data.append('description', formData.description);
    data.append('ownerId', user._id);
    if (file) data.append('image', file);

    try {
      const response = await fetch('https://event-planner-9dgd.onrender.com/api/vendors', {
        method: 'POST',
        body: data // FormData
      });

      if (response.ok) {
        toast.success("Service Published Successfully!");
        navigate('/vendor/dashboard');
      } else {
        toast.error("Failed to save service.");
      }
    } catch (error) {
      toast.error("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Service</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div><label className="block text-sm font-medium mb-1">Service Name</label><input name="name" required onChange={handleChange} className="w-full border rounded-lg p-2.5" placeholder="e.g. Wedding DJ Package" /></div>
        <div className="grid grid-cols-2 gap-6">
          <div><label className="block text-sm font-medium mb-1">Category</label><select name="type" onChange={handleChange} className="w-full border rounded-lg p-2.5"><option value="DJ">DJ</option><option value="Lawn">Lawn</option><option value="Catering">Catering</option><option value="Photographer">Photographer</option></select></div>
          <div><label className="block text-sm font-medium mb-1">Price (₹)</label><input name="price" required type="number" onChange={handleChange} className="w-full border rounded-lg p-2.5" /></div>
        </div>
        <div><label className="block text-sm font-medium mb-1">Location</label><input name="location" required onChange={handleChange} className="w-full border rounded-lg p-2.5" /></div>
        <div><label className="block text-sm font-medium mb-1">Description</label><textarea name="description" required onChange={handleChange} className="w-full border rounded-lg p-2.5" rows="4"></textarea></div>
        
        {/* FILE UPLOAD */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <label className="block text-sm font-medium text-purple-800 mb-1">Service Image</label>
          <input type="file" required onChange={handleFileChange} accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition">
          {loading ? 'Uploading...' : 'Publish Service'}
        </button>
      </form>
    </div>
  );
};
export default AddService;