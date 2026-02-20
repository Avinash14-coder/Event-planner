import React from "react";
import { Search, Star } from "lucide-react";

const BirthdayServicesPage = () => {
  const CARDS = [
    {
      title: "Birthday Venues",
      subtitle: "Indoor & Outdoor Spaces",
      img: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84",
    },
    {
      title: "Cake Shops",
      subtitle: "Custom Theme Cakes",
      img: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
    },
    {
      title: "Decorations",
      subtitle: "Balloon & Theme Decor",
      img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    },
    {
      title: "Gift Shops",
      subtitle: "Return Gift Collections",
      img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a",
    },
    {
      title: "Foods & Beverage",
      subtitle: "Delicious Party Menus",
      img: "https://images.unsplash.com/photo-1555244162-803834f70033",
    },
    {
      title: "Entertainment",
      subtitle: "Music & Entertainment",
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    },
    {
      title: "Photography & Media",
      subtitle: "Photo shoots",
      img: "https://www.adorama.com/alc/wp-content/uploads/2020/10/professional-photographer-outdoor-feature.jpg",
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
            placeholder="Find cakes, venues, DJs..."
            className="bg-transparent outline-none w-full text-sm placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 overflow-x-auto px-5 mb-8">
        {["All Services", "Kids Party", "Luxury", "Budget"].map((f, i) => (
          <button
            key={i}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
              i === 0 ? "bg-pink-600 text-white" : "bg-slate-800 text-slate-300"
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
            src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
            alt="Birthday celebration"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute bottom-4 left-4">
            <p className="text-xs tracking-widest text-pink-400 font-bold uppercase">
              Party Special
            </p>
            <h2 className="text-2xl font-bold">Birthday Party Services</h2>
            <p className="text-sm text-slate-300">80+ vendors available</p>
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
        <div className="border border-dashed border-pink-400/30 rounded-3xl p-10 text-center bg-slate-900">
          <h3 className="text-xl font-bold text-pink-400 mb-2">
            Need Full Party Planning?
          </h3>
          <p className="text-slate-400 text-sm">
            Our birthday concierge team is here to help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BirthdayServicesPage;
