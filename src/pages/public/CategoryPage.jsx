import React from "react";
import { useParams } from "react-router-dom";
import { Search, Star } from "lucide-react";

const CategoryPage = () => {
  const { name } = useParams();

  const CARDS = [
    {
      title: "Bridal Boutiques",
      subtitle: "Couture & Ready-to-wear",
      img: "https://assets.architecturaldigest.in/photos/652fe2e649ce97d91e8fc81e/master/w_1600%2Cc_limit/Jade.jpg",
    },
    {
      title: "Floral Design",
      subtitle: "Lush botanical artistry",
      img: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9",
    },
    {
      title: "Catering",
      subtitle: "Fine dining experiences",
      img: "https://images.unsplash.com/photo-1555244162-803834f70033",
    },
    {
      title: "Haldi",
      img: "https://t4.ftcdn.net/jpg/16/56/92/25/240_F_1656922595_BNsa7pGImEy0wbdrIPdfmvyrI4eHlYN0.jpg",
    },
    {
      title: "Sangeet",
      img: "https://i.ytimg.com/vi/H9Ekw2BPbD4/maxresdefault.jpg",
    },
    {
      title: "Mehendi",
      img: "https://t3.ftcdn.net/jpg/16/47/17/90/240_F_1647179097_lpNX9Ik2bDJrg5loFWXqaK3cUYFEheoH.jpg",
    },
    {
      title: "Engagement",
      img: "https://p1.piqsels.com/preview/386/546/528/jewelry-engagement-wedding-jewelry-band-romance-luxury.jpg",
    },
    {
      title: "Photography",
      subtitle: "Capturing the soul",
      img: "https://www.adorama.com/alc/wp-content/uploads/2020/10/professional-photographer-outdoor-feature.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HEADER TITLE */}
      <div className="px-5 pt-6 pb-14"></div>

      {/* SEARCH BAR */}
      <div className="px-5 mb-5">
        <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur-md px-4 py-3 rounded-xl">
          <Search size={18} className="text-slate-400" />
          <input
            placeholder="Find venues, florists, or boutiques..."
            className="bg-transparent outline-none w-full text-sm placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 overflow-x-auto px-5 mb-8">
        {["All Services", "Luxury", "Outdoor", "Indoor"].map((f, i) => (
          <button
            key={i}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
              i === 0 ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"
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
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute bottom-4 left-4">
            <p className="text-xs tracking-widest text-yellow-400 font-bold uppercase">
              Premium Selection
            </p>
            <h2 className="text-2xl font-bold">Wedding Venues</h2>
            <p className="text-sm text-slate-300">124 locations found</p>
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
        <div className="border border-dashed border-yellow-400/30 rounded-3xl p-10 text-center bg-slate-900">
          <h3 className="text-xl font-bold text-yellow-400 mb-2">
            Wedding Planning
          </h3>
          <p className="text-slate-400 text-sm">Concierge Assistance</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
