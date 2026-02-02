import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Star, ShieldCheck, Heart } from 'lucide-react';

const Home = () => {
  // ... (Keep your heroWallpapers and categories arrays same as before)
  const heroWallpapers = [
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop",
  ];
  const [currentHero, setCurrentHero] = useState(heroWallpapers[0]);
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * heroWallpapers.length);
    setCurrentHero(heroWallpapers[randomIndex]);
  }, []);
  
  const categories = [
    { name: "DJs & Music", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop", link: "/vendors?type=dj" },
    { name: "Marriage Halls", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop", link: "/vendors?type=lawn" },
    { name: "Photographers", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop", link: "/vendors?type=photographer" },
    { name: "Catering", image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop", link: "/vendors?type=catering" }
  ];

  return (
    <div>
      {/* --- HERO SECTION --- */}
      {/* Changed h-[600px] to min-h for better mobile adaptability */}
      <div className="relative min-h-[500px] md:h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <img src={currentHero} alt="Event Background" className="w-full h-full object-cover transition-opacity duration-1000" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 text-white max-w-4xl py-20">
          <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block backdrop-blur-md border border-white/30">
            Plan Your Dream Event
          </span>
          {/* Responsive Text: text-4xl on mobile, text-7xl on PC */}
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl">
            Moments That Last <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">Forever</span>
          </h1>
          <p className="text-base md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Find the perfect vendors for your Wedding, Birthday, or Corporate Event in Nashik.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center px-6">
            <Link to="/vendors" className="bg-purple-600 hover:bg-purple-700 text-white w-full md:w-auto px-8 py-3.5 rounded-full font-bold text-lg transition flex items-center justify-center gap-2">
              <Search size={20}/> Find Vendors
            </Link>
            <Link to="/login" className="bg-white hover:bg-gray-100 text-purple-900 w-full md:w-auto px-8 py-3.5 rounded-full font-bold text-lg transition flex items-center justify-center gap-2">
              Join as Vendor <ArrowRight size={20}/>
            </Link>
          </div>
        </div>
      </div>

      {/* --- CATEGORIES SECTION --- */}
      <div className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Explore Our Services</h2>
            <div className="w-16 h-1.5 bg-purple-600 mx-auto rounded-full mb-6"></div>
          </div>

          {/* Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <Link to={cat.link} key={index} className="group relative rounded-2xl overflow-hidden h-64 shadow-lg cursor-pointer">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <div className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
             {[ 
              { icon: ShieldCheck, title: "Verified Vendors", desc: "Every vendor is personally verified for quality and reliability." },
              { icon: Star, title: "Transparent Pricing", desc: "No hidden costs. Compare rates and book within your budget." },
              { icon: Heart, title: "Stress-Free Planning", desc: "We make planning your big day simple, smooth, and enjoyable." }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-3xl bg-gray-50 md:bg-transparent">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-4">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;