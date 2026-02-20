import React from "react";
import { Search, Star } from "lucide-react";

const AnniversaryPage = () => {
  const CARDS = [
    {
      title: "Romantic Venues",
      subtitle: "Intimate & Elegant Spaces",
      img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
    },
    {
      title: "Fine Dining",
      subtitle: "Private & Candlelight Dinners",
      img: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    },
    {
      title: "Floral Decoration",
      subtitle: "Rose & Luxury Arrangements",
      img: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9",
    },
    {
      title: "Photography",
      subtitle: "Couple & Memory Shoots",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
      title: "Live Music",
      subtitle: "Soft Romantic Performances",
      img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    },
    {
      title: "Customized Gifts",
      subtitle: "Personalized Keepsakes",
      img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <div className="px-5 pt-6 pb-14"></div>

      {/* SEARCH BAR */}
      <div className="px-5 mb-5">
        <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur-md px-4 py-3 rounded-xl">
          <Search size={18} className="text-slate-400" />
          <input
            placeholder="Search venues, gifts, dining..."
            className="bg-transparent outline-none w-full text-sm placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 overflow-x-auto px-5 mb-8">
        {["All Services", "Romantic", "Luxury", "Private"].map((f, i) => (
          <button
            key={i}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
              i === 0 ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* HERO CARD */}
      <div className="px-5 mb-10">
        <div className="relative h-60 rounded-2xl overflow-hidden group shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1520857014576-2c4f4c972b57"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
            alt="Anniversary celebration"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute bottom-4 left-4">
            <p className="text-xs tracking-widest text-rose-400 font-bold uppercase">
              Timeless Romance
            </p>
            <h2 className="text-2xl font-bold">Anniversary Services</h2>
            <p className="text-sm text-slate-300">60+ curated experiences</p>
          </div>

          <button className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full">
            <Star size={18} />
          </button>
        </div>
      </div>

      {/* GRID CARDS */}
      <div className="grid grid-cols-2 gap-5 px-5 pb-12">
        {CARDS.map((c, i) => (
          <div
            key={i}
            className="relative h-56 rounded-2xl overflow-hidden group shadow-lg"
          >
            <img
              src={c.img}
              alt={c.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute bottom-4 left-4">
              <h3 className="text-lg font-bold">{c.title}</h3>
              <p className="text-xs text-slate-300">{c.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM BANNER */}
      <div className="px-5 pb-16">
        <div className="border border-dashed border-rose-400/30 rounded-3xl p-10 text-center bg-slate-900">
          <h3 className="text-xl font-bold text-rose-400 mb-2">
            Celebrate Love in Style
          </h3>
          <p className="text-slate-400 text-sm">
            Our anniversary specialists create unforgettable memories.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnniversaryPage;
