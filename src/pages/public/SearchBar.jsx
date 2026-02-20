import React from "react";

const SearchBar = () => {
  return (
    <section className="px-4 mb-8">
      <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-xl shadow-black/5 border border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <span className="material-symbols-outlined text-slate-400 font-light">
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 text-slate-900 dark:text-soft-cream placeholder:text-slate-400 flex-1 text-sm font-semibold p-0"
            placeholder="Search venues, catering..."
            type="text"
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2 cursor-pointer active:opacity-60 transition-opacity">
            <span className="material-symbols-outlined text-primary text-xl fill-1">
              location_on
            </span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              New York, NY
            </span>
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>

          <div className="flex items-center gap-2 cursor-pointer active:opacity-60 transition-opacity">
            <span className="material-symbols-outlined text-primary text-xl">
              calendar_today
            </span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Oct 12 - 14
            </span>
          </div>

          <button className="size-9 bg-primary/10 text-primary rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors active:scale-90">
            <span className="material-symbols-outlined text-lg">tune</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
