import React from "react";
import { Search, Star } from "lucide-react";

const ReceptionPartyPage = () => {
  const CARDS = [
    {
      title: "Luxury Venues",
      subtitle: "Banquet & Ballroom Spaces",
      img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
    },
    {
      title: "Catering Services",
      subtitle: "Multi-Cuisine & Fine Dining",
      img: "https://images.unsplash.com/photo-1555244162-803834f70033",
    },
    {
      title: "Stage Decoration",
      subtitle: "Elegant Floral Themes",
      img: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9",
    },
    {
      title: "Live Music & DJ",
      subtitle: "Entertainment & Sound",
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    },
    {
      title: "Photography",
      subtitle: "Professional Coverage",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
      title: "Bridal Entry Concepts",
      subtitle: "Royal & Grand Arrivals",
      img: "https://images.unsplash.com/photo-1600152278069-35f5bce7c5e3",
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
            placeholder="Search venues, catering, decoration..."
            className="bg-transparent outline-none w-full text-sm placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 overflow-x-auto px-5 mb-8">
        {["All Services", "Luxury", "Indoor", "Outdoor"].map((f, i) => (
          <button
            key={i}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
              i === 0
                ? "bg-purple-600 text-white"
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
            src="https://images.unsplash.com/photo-1519741497674-611481863552"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
            alt="Reception celebration"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute bottom-4 left-4">
            <p className="text-xs tracking-widest text-purple-400 font-bold uppercase">
              Grand Celebration
            </p>
            <h2 className="text-2xl font-bold">Reception Party Services</h2>
            <p className="text-sm text-slate-300">150+ premium vendors</p>
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
        <div className="border border-dashed border-purple-400/30 rounded-3xl p-10 text-center bg-slate-900">
          <h3 className="text-xl font-bold text-purple-400 mb-2">
            Need Complete Reception Planning?
          </h3>
          <p className="text-slate-400 text-sm">
            Our luxury planners will handle everything for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReceptionPartyPage;
