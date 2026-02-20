import React from "react";
import { Search, Star } from "lucide-react";

const BachelorPartyPage = () => {
  const CARDS = [
    {
      title: "Party Venues",
      subtitle: "Clubs, Lounges & Villas",
      img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    },
    {
      title: "DJ & Live Music",
      subtitle: "High Energy Entertainment",
      img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    },
    {
      title: "Catering & Bar",
      subtitle: "Premium Drinks & Food",
      img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187",
    },
    {
      title: "Decor & Lighting",
      subtitle: "LED, Neon & Theme Setup",
      img: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
    },
    {
      title: "Luxury Rides",
      subtitle: "Limousine & Supercars",
      img: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
    },
    {
      title: "Adventure Activities",
      subtitle: "Trips, Yacht & Experiences",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* SEARCH BAR */}
      <div className="px-5 pt-6 mb-5">
        <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur-md px-4 py-3 rounded-xl">
          <Search size={18} className="text-slate-400" />
          <input
            placeholder="Search clubs, DJs, villas..."
            className="bg-transparent outline-none w-full text-sm placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 overflow-x-auto px-5 mb-8">
        {["All Services", "Nightlife", "Luxury", "Adventure"].map((f, i) => (
          <button
            key={i}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
              i === 0
                ? "bg-indigo-600 text-white"
                : "bg-slate-800 text-slate-300"
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
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
            alt="Bachelor Party"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute bottom-4 left-4">
            <p className="text-xs tracking-widest text-indigo-400 font-bold uppercase">
              Epic Night
            </p>
            <h2 className="text-2xl font-bold">Bachelor Party Services</h2>
            <p className="text-sm text-slate-300">80+ premium experiences</p>
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

      {/* BOTTOM CTA */}
      <div className="px-5 pb-16">
        <div className="border border-dashed border-indigo-400/30 rounded-3xl p-10 text-center bg-slate-900">
          <h3 className="text-xl font-bold text-indigo-400 mb-2">
            Make It Legendary
          </h3>
          <p className="text-slate-400 text-sm">
            Plan the ultimate bachelor night with top-tier services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BachelorPartyPage;
