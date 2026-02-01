import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Star, ShieldCheck, Heart } from 'lucide-react';

const Home = () => {
  // --- SAFE & TESTED HERO WALLPAPERS ---
  const heroWallpapers = [
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop", // Wedding Aisle
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop", // Concert
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2000&auto=format&fit=crop", // Party Lights
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop", // Hall
  ];

  const [currentHero, setCurrentHero] = useState(heroWallpapers[0]);

  useEffect(() => {
    // Pick a random image on load
    const randomIndex = Math.floor(Math.random() * heroWallpapers.length);
    setCurrentHero(heroWallpapers[randomIndex]);
  }, []);

  // --- SAFE CATEGORY IMAGES (Fixed Broken Links) ---
  const categories = [
    { 
      name: "DJs & Music", 
      // NEW WORKING LINK
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop", 
      link: "/vendors?type=dj"
    },
    { 
      name: "Marriage Halls", 
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
      link: "/vendors?type=lawn"
    },
    { 
      name: "Photographers", 
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
      link: "/vendors?type=photographer"
    },
    { 
      name: "Catering", 
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
      link: "/vendors?type=catering"
    }
  ];

  return (
    <div>
      {/* --- HERO SECTION --- */}
      <div className="relative h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={currentHero} 
            alt="Event Background" 
            className="w-full h-full object-cover transition-opacity duration-1000 animate-fade-in"
            // Fallback if hero breaks: shows a nice purple gradient
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = 'linear-gradient(to right, #4c1d95, #7c3aed)';
            }}
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-white max-w-4xl">
          <span className="bg-white/20 text-white px-5 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest mb-6 inline-block backdrop-blur-md border border-white/30 shadow-lg">
            Plan Your Dream Event
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight drop-shadow-2xl">
            Moments That Last <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">Forever</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Find the perfect vendors for your Wedding, Birthday, or Corporate Event in Nashik.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link to="/vendors" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-10 py-4 rounded-full font-bold text-lg transition shadow-xl shadow-purple-900/40 flex items-center justify-center gap-2 transform hover:-translate-y-1">
              <Search size={22}/> Find Vendors
            </Link>
            <Link to="/login" className="bg-white hover:bg-gray-100 text-purple-900 px-10 py-4 rounded-full font-bold text-lg transition shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-1">
              Join as Vendor <ArrowRight size={20}/>
            </Link>
          </div>
        </div>
      </div>

      {/* --- CATEGORIES SECTION --- */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Explore Our Services</h2>
            <div className="w-24 h-1.5 bg-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Everything you need to make your event unforgettable, all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {categories.map((cat, index) => (
              <Link to={cat.link} key={index} className="group relative rounded-2xl overflow-hidden h-80 shadow-lg cursor-pointer transform hover:-translate-y-2 transition duration-300">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                  // If image breaks, show gradient
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-white text-2xl font-bold group-hover:text-purple-300 transition">{cat.name}</h3>
                  <div className="w-full h-1 bg-purple-500 mt-3 transform scale-x-0 group-hover:scale-x-100 transition duration-500 origin-left"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <div className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[ 
              { icon: ShieldCheck, title: "Verified Vendors", desc: "Every vendor is personally verified for quality and reliability." },
              { icon: Star, title: "Transparent Pricing", desc: "No hidden costs. Compare rates and book within your budget." },
              { icon: Heart, title: "Stress-Free Planning", desc: "We make planning your big day simple, smooth, and enjoyable." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl hover:bg-purple-50 transition duration-300 border border-transparent hover:border-purple-100 group">
                <div className="w-20 h-20 bg-purple-100 group-hover:bg-purple-600 rounded-full flex items-center justify-center text-purple-600 group-hover:text-white mx-auto mb-6 shadow-sm transition duration-300">
                  <feature.icon size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;