import React, { useState, useEffect } from 'react';
import { Star, MapPin, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const getFallbackImage = (category) => {
  const cat = category?.toLowerCase().trim();
  if (cat === 'dj') return "https://images.unsplash.com/photo-1571266028243-371695039980?auto=format&fit=crop&q=80&w=800";
  if (cat === 'catering') return "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800";
  if (cat === 'lawn' || cat === 'marriage hall') return "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800";
  if (cat === 'photographer') return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800";
  return "https://images.unsplash.com/photo-1514525253440-b39345208668?auto=format&fit=crop&q=80&w=800";
};

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        // Dynamic URL for Local vs Production
        const baseUrl = window.location.hostname === "localhost" 
          ? "http://localhost:5000" 
          : "https://event-planner-api.onrender.com"; 

        const response = await fetch(`${baseUrl}/api/vendors`);
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

  const filteredVendors = vendors.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-10">
      
      {/* --- HEADER SECTION --- */}
      {/* Flex-col on mobile (stack vertically), Flex-row on desktop (side-by-side) */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div className="w-full md:w-auto">
           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Find Your Vendor</h1>
           <p className="text-gray-500 text-sm md:text-base">{filteredVendors.length} vendors available</p>
        </div>
        
        {/* Search Bar - Full Width on Mobile */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search DJ, Lawn, etc..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none shadow-sm transition" 
          />
        </div>
      </div>

      {/* --- GRID SECTION --- */}
      {filteredVendors.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <Filter className="mx-auto text-gray-300 mb-3" size={48} />
          <p className="text-xl text-gray-400">No vendors found matching your search.</p>
        </div>
      ) : (
        // Grid: 1 col (Mobile) -> 2 cols (Tablet) -> 3 cols (Desktop)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredVendors.map((vendor) => {
            const imageUrl = (vendor.images && vendor.images.length > 0 && vendor.images[0]) 
              ? vendor.images[0] 
              : getFallbackImage(vendor.type);

            return (
              <div key={vendor._id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 flex flex-col group h-full">
                
                {/* Image */}
                <div className="h-48 md:h-56 overflow-hidden relative bg-gray-200">
                  <img 
                    src={imageUrl}
                    alt={vendor.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    onError={(e) => { e.target.onerror = null; e.target.src = getFallbackImage(vendor.type); }} 
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-purple-700 shadow-sm uppercase tracking-wider">
                    {vendor.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-purple-600 transition">{vendor.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-4 gap-1 mt-2">
                    <MapPin size={16} className="text-purple-400" /> {vendor.location}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                      <Star size={16} fill="currentColor" /> {vendor.rating || 4.5}
                    </div>
                    <div className="font-bold text-gray-800 text-lg">
                      ₹{vendor.price}
                    </div>
                  </div>

                  <Link 
                    to={`/vendors/${vendor._id}`} 
                    className="block w-full text-center mt-5 bg-gray-50 text-purple-700 py-3 rounded-xl font-bold hover:bg-purple-600 hover:text-white transition shadow-sm hover:shadow-md"
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