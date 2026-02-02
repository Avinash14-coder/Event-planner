import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// ✅ FIXED: Added CheckCircle to imports to prevent build error
import { MapPin, Star, Phone, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const getFallbackImage = (category) => {
  const cat = category?.toLowerCase().trim();
  if (cat === 'dj') return "https://images.unsplash.com/photo-1571266028243-371695039980?auto=format&fit=crop&q=80&w=1200";
  if (cat === 'catering') return "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200";
  if (cat === 'lawn') return "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200";
  if (cat === 'photographer') return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200";
  return "https://images.unsplash.com/photo-1514525253440-b39345208668?auto=format&fit=crop&q=80&w=1200";
};

const VendorDetails = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        // Ensure this matches your live backend URL if deployed, or localhost if local
        const baseUrl = window.location.hostname === "localhost" 
          ? "http://localhost:5000" 
          : "https://event-planner-api.onrender.com"; // ⚠️ Update this if your backend URL is different

        const response = await fetch(`${baseUrl}/api/vendors/${id}`);
        const data = await response.json();
        setVendor(data);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendor();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!vendor) return <div className="text-center py-20">Vendor not found</div>;

  const heroImage = (vendor.images && vendor.images.length > 0 && vendor.images[0]) 
    ? vendor.images[0] 
    : getFallbackImage(vendor.type);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Image - Responsive Height */}
      <div className="h-[300px] md:h-[400px] w-full relative bg-gray-900">
        <img 
          src={heroImage} 
          alt={vendor.name} 
          className="w-full h-full object-cover opacity-80"
          onError={(e) => { e.target.onerror = null; e.target.src = getFallbackImage(vendor.type); }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        
        <div className="absolute top-6 left-6">
           <Link to="/vendors" className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/30 transition border border-white/30">
             <ArrowLeft size={20} /> Back
           </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-white">
           <div className="container mx-auto">
             <span className="bg-purple-600 text-white px-3 py-1 rounded text-xs md:text-sm font-bold uppercase tracking-wide mb-3 inline-block shadow-lg">
               {vendor.type}
             </span>
             {/* Responsive Title */}
             <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">{vendor.name}</h1>
             <div className="flex flex-wrap items-center gap-4 text-sm md:text-lg opacity-90">
               <span className="flex items-center gap-1"><MapPin size={18} /> {vendor.location}</span>
               <span className="flex items-center gap-1 text-yellow-400 font-bold"><Star size={18} fill="currentColor" /> {vendor.rating || 4.5} (24 Reviews)</span>
             </div>
           </div>
        </div>
      </div>

      {/* Main Content Grid: Stacks on mobile, 3 cols on desktop */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
        
        {/* Left: Description */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">About This Service</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{vendor.description}</p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Amenities & Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {["Instant Booking", "Verified Vendor", "Best Price Guarantee", "24/7 Support"].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
                   <CheckCircle className="text-green-500" size={20} /> {item}
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Right: Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 lg:sticky lg:top-24">
            <div className="text-3xl font-bold text-gray-800 mb-1">₹{vendor.price}</div>
            <p className="text-gray-500 text-sm mb-6">Starting price per event</p>
            
            <button className="w-full bg-purple-600 text-white font-bold py-3 md:py-4 rounded-xl hover:bg-purple-700 transition mb-4 shadow-lg shadow-purple-200">
              Book Now
            </button>
            <button className="w-full border-2 border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition">
              Send Enquiry
            </button>

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                 <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600"><Phone size={20}/></div>
                 <div>
                   <p className="text-xs text-gray-400 font-bold uppercase">Call Us</p>
                   <p className="font-bold">+91 98765 43210</p>
                 </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                 <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600"><Mail size={20}/></div>
                 <div>
                   <p className="text-xs text-gray-400 font-bold uppercase">Email Us</p>
                   <p className="font-bold">contact@eventmaster.com</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VendorDetails;