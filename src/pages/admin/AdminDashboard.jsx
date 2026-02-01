import React, { useEffect, useState } from 'react';
import { Users, Store, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch All Data
  const fetchData = async () => {
    try {
      // Fetch Users
      // Note: You might need to create a route for 'GET /api/users' in backend if you haven't, 
      // but for now let's just fetch vendors since that route exists.
      const vendorRes = await fetch('http://localhost:5000/api/vendors');
      const vendorData = await vendorRes.json();
      setVendors(vendorData);
      
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteVendor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      // NOTE: We haven't created a DELETE route in backend yet, 
      // but this is how the frontend would look.
      // For now, we will just filter it from UI to show the effect.
      setVendors(vendors.filter(v => v._id !== id));
      toast.success("Service Deleted (UI Only - Add Backend Route for Real Delete)");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100 font-bold uppercase text-xs">Total Services</p>
              <h2 className="text-4xl font-bold">{vendors.length}</h2>
            </div>
            <Store size={40} className="opacity-50" />
          </div>
        </div>
        
        <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-purple-100 font-bold uppercase text-xs">Total Users</p>
              <h2 className="text-4xl font-bold">--</h2>
            </div>
            <Users size={40} className="opacity-50" />
          </div>
          <p className="text-xs mt-2 opacity-75">(Requires User API route)</p>
        </div>
      </div>

      {/* Vendor Management Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Manage Services</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:border-purple-500" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 uppercase text-xs font-bold text-gray-500">
              <tr>
                <th className="px-6 py-4">Service Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vendors.map((vendor) => (
                <tr key={vendor._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-bold text-gray-800">{vendor.name}</td>
                  <td className="px-6 py-4">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">{vendor.type}</span>
                  </td>
                  <td className="px-6 py-4">₹{vendor.price}</td>
                  <td className="px-6 py-4">{vendor.location}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDeleteVendor(vendor._id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                      title="Delete Service"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {vendors.length === 0 && <div className="p-8 text-center text-gray-400">No services found.</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;