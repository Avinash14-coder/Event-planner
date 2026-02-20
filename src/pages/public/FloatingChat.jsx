import React from "react";

const FloatingChat = () => {
  return (
    <div className="fixed bottom-32 right-6 z-40">
      <button className="size-14 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-full shadow-2xl shadow-black/20 flex items-center justify-center text-primary hover:scale-110 active:scale-90 transition-all group">
        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">
          chat_bubble
        </span>
        <div className="absolute -top-1 -right-1 size-4 bg-primary text-[8px] font-bold text-white rounded-full flex items-center justify-center border-2 border-white dark:border-surface-dark">
          1
        </div>
      </button>
    </div>
  );
};

export default FloatingChat;
