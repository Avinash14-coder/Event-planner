import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Star, ShieldCheck, Heart } from 'lucide-react';

const Home = () => {
  const heroWallpapers = [
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop",
  ];
  const [currentHero, setCurrentHero] = useState(heroWallpapers[0]);

  const categories = [
    { name: "DJs & Music", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop", link: "/vendors?type=dj" },
    { name: "Marriage Halls", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop", link: "/vendors?type=lawn" },
    { name: "Photographers", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop", link: "/vendors?type=photographer" },
    { name: "Catering", image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop", link: "/vendors?type=catering" }
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <div className="relative min-h-[550px] md:h-[650px] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={currentHero} alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 text-white max-w-4xl py-10">
          {/* Tag: Using explicit hex color #b14e79 */}
          <span className="bg-[#b14e79]/90 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block shadow-lg border border-[#c17194]">
            Plan Your Dream Event
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl">
            Moments That Last <br/>
            {/* Gradient Text: Using explicit hex colors */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d095af] to-pink-200">Forever</span>
          </h1>
          <p className="text-base md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed px-4 opacity-90">
            Find the perfect vendors for your Wedding, Birthday, or Corporate Event in Nashik.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center px-6">
            {/* Find Vendors Button: explicit #b14e79 */}
            <Link to="/vendors" className="bg-[#b14e79] hover:bg-[#8e3e61] text-white w-full md:w-auto px-8 py-4 rounded-full font-bold text-lg transition flex items-center justify-center gap-2 shadow-xl shadow-[#231018]/20">
              <Search size={20}/> Find Vendors
            </Link>
            {/* Join Button: Text color #6a2f49 */}
            <Link to="/login" className="bg-white hover:bg-gray-50 text-[#6a2f49] w-full md:w-auto px-8 py-4 rounded-full font-bold text-lg transition flex items-center justify-center gap-2 shadow-lg">
              Join as Vendor <ArrowRight size={20}/>
            </Link>
          </div>
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      <div className="py-16 bg-[#f7edf2]/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Explore Services</h2>
            {/* Underline: explicit #b14e79 */}
            <div className="w-16 h-1.5 bg-[#b14e79] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <Link to={cat.link} key={index} className="group relative rounded-2xl overflow-hidden h-64 shadow-lg cursor-pointer transform hover:-translate-y-2 transition duration-300">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#190b11]/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold group-hover:text-[#e0b8c9] transition">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
             {[ 
              { icon: ShieldCheck, title: "Verified Vendors", desc: "Every vendor is personally verified for quality." },
              { icon: Star, title: "Transparent Pricing", desc: "No hidden costs. Compare rates within your budget." },
              { icon: Heart, title: "Stress-Free Planning", desc: "We make planning your big day simple and smooth." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition">
                <div className="w-16 h-16 bg-[#efdce4] rounded-2xl flex items-center justify-center text-[#8e3e61] mx-auto mb-6 transform rotate-3 group-hover:rotate-6 transition">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
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