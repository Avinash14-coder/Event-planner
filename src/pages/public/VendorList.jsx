import React, { useState, useEffect } from 'react';
import { Star, MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- ROBUST FALLBACK SYSTEM ---
const getFallbackImage = (category) => {
  const cat = category?.toLowerCase().trim();
  if (cat === 'dj') return "https://images.unsplash.com/photo-1571266028243-371695039980?auto=format&fit=crop&q=80&w=800";
  if (cat === 'catering') return "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800";
  if (cat === 'lawn' || cat === 'marriage hall') return "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800";
  if (cat === 'photographer') return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800";
  // Default General Event Image
  return "https://images.unsplash.com/photo-1514525253440-b39345208668?auto=format&fit=crop&q=80&w=800";
};

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/vendors');
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  // Filter Logic
  const filteredVendors = vendors.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-20 text-xl font-bold text-gray-500">Loading amazing vendors...</div>;

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-800">Find Your Vendor</h1>
           <p className="text-gray-500">{filteredVendors.length} vendors available</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search DJ, Lawn, etc..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
          />
        </div>
      </div>

      {filteredVendors.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-xl text-gray-400 mb-4">No vendors found matching your search.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {filteredVendors.map((vendor) => {
            
            // LOGIC: Determine Image URL BEFORE rendering
            // If vendor.images exists and isn't empty, use it. OTHERWISE, use Fallback immediately.
            const imageUrl = (vendor.images && vendor.images.length > 0 && vendor.images[0]) 
              ? vendor.images[0] 
              : getFallbackImage(vendor.type);

            return (
              <div key={vendor._id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100 flex flex-col group">
                
                {/* Image Section */}
                <div className="h-48 overflow-hidden relative bg-gray-200">
                  <img 
                    src={imageUrl}
                    alt={vendor.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    onError={(e) => { 
                      // Backup Safety: If the specific URL breaks (404), switch to fallback
                      e.target.onerror = null; 
                      e.target.src = getFallbackImage(vendor.type); 
                    }} 
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-700 shadow-sm uppercase">
                    {vendor.type}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-purple-600 transition">{vendor.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-4 gap-1 mt-2">
                    <MapPin size={16} /> {vendor.location}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-1 text-yellow-500 font-bold">
                      <Star size={16} fill="currentColor" /> {vendor.rating || 0}
                    </div>
                    <div className="font-bold text-gray-800">
                      ₹{vendor.price} <span className="text-xs font-normal text-gray-500">/ event</span>
                    </div>
                  </div>

                  <Link 
                    to={`/vendors/${vendor._id}`} 
                    className="block w-full text-center mt-4 bg-purple-50 text-purple-700 py-2 rounded-lg font-bold hover:bg-purple-600 hover:text-white transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VendorList;