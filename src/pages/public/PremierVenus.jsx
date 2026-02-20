import React, { useState } from "react";

const VENUES = [
  {
    id: 1,
    name: "The Glass Pavillion",
    location: "Midtown East, Manhattan",
    price: "$2,500",
    rating: 4.9,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3HFatB2VIFD_ZaksAhwqSgUhe7Ax3S7EUl8isC4WJI779ENEAiaH172OJhecOvKtT3L3BKUiuylgnHQqTefVF_DULSU_ebZDknTABjmz2YgUKeNP0nIF0F9HeJsbrSg6G-2cONIfFoy9VTVORIEm3aTneCXli5zMEmMaeUcpzQMwchxl4PKn6k2tPkMUi7rXWdMYmBnkMKKvHEmFXhZEG6J76TOHBYwnEbSpx3NkjcOxfTMIVyr2snVLd7_gqKj9KUdCzeSWnMU79",
    tags: ["Top Rated", "Verified"],
  },
];

const PremierVenues = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  return (
    <section className="px-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-extrabold tracking-tight dark:text-white">
          Premier Venues
        </h3>
      </div>

      <div className="space-y-6">
        {VENUES.map((venue) => (
          <div
            key={venue.id}
            className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-xl shadow-black/5 border border-slate-200/60 dark:border-slate-800 active:scale-[0.98] transition-transform"
          >
            <div className="relative h-60">
              <img
                className="w-full h-full object-cover"
                alt={venue.name}
                src={venue.img}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(venue.id);
                }}
                className={`absolute top-4 right-4 size-10 rounded-full flex items-center justify-center transition-all ${
                  favorites.includes(venue.id)
                    ? "bg-red-500 text-white"
                    : "bg-white/20 backdrop-blur-md text-white border border-white/20"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-xl ${favorites.includes(venue.id) ? "fill-1" : ""}`}
                >
                  favorite
                </span>
              </button>

              <div className="absolute bottom-4 left-4 flex gap-2">
                {venue.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`${tag === "Top Rated" ? "bg-primary" : "bg-black/60"} backdrop-blur-md text-white text-[9px] font-extrabold px-2.5 py-1.5 rounded-lg uppercase tracking-wider`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-extrabold text-xl text-slate-900 dark:text-white">
                    {venue.name}
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                    {venue.location}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-accent-gold bg-accent-gold/5 px-2 py-1 rounded-lg">
                  <span className="material-symbols-outlined text-sm fill-1">
                    star
                  </span>
                  <span className="text-sm font-bold">{venue.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-primary font-extrabold text-xl">
                  {venue.price}{" "}
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                    / day
                  </span>
                </p>
                <button className="text-sm font-bold bg-slate-100 dark:bg-background-dark px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors active:scale-95">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PremierVenues;
