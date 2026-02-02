// ... (Keep existing imports and fetch logic)

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
        {/* ... (Keep overlay gradients and back button same) ... */}
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-white">
           <div className="container mx-auto">
             <span className="bg-purple-600 text-white px-3 py-1 rounded text-xs md:text-sm font-bold uppercase mb-3 inline-block">
               {vendor.type}
             </span>
             {/* Responsive Title Size */}
             <h1 className="text-3xl md:text-5xl font-bold mb-3">{vendor.name}</h1>
             <div className="flex flex-wrap items-center gap-4 text-sm md:text-lg opacity-90">
               <span className="flex items-center gap-1"><MapPin size={18} /> {vendor.location}</span>
               <span className="flex items-center gap-1 text-yellow-400 font-bold"><Star size={18} fill="currentColor" /> {vendor.rating || 4.5}</span>
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
            <p className="text-gray-600 leading-relaxed">{vendor.description}</p>
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

        {/* Right: Booking Card (Stacks at bottom on mobile) */}
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
            
            {/* ... (Contact info same as before) ... */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default VendorDetails;