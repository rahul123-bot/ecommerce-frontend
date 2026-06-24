import React from "react";

const Loader = () => {
  return (
    <div className="w-full min-h-[60vh] sm:min-h-[75vh] flex flex-col items-center justify-center bg-slate-50/40 backdrop-blur-[1px] px-4 py-12 transition-all duration-300 animate-in fade-in">
      <div className="relative flex flex-col items-center justify-center text-center">
        
        {/* PREMIUM MULTI-RING LOADER ENGINE */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 mb-4">
          {/* TRACK RING */}
          <div className="absolute inset-0 border-4 border-slate-200 rounded-full" />
          
          {/* ANIMATED ACCENT BRAND RING */}
          <div className="absolute inset-0 border-4 border-[#2874f0] border-t-transparent border-r-transparent rounded-full animate-spin duration-700" />
          
          {/* HIGH-VELOCITY INNER MICRO RING */}
          <div className="absolute inset-1.5 border-[3px] border-amber-400 border-b-transparent border-l-transparent rounded-full animate-spin [animation-direction:reverse] duration-500 opacity-80" />
        </div>

        {/* MARKETPLACE STATUS MICRO-TEXT HEADER */}
        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide select-none">
            Loading...
          </p>
          <p className="text-[10px] sm:text-[11px] font-semibold text-slate-400 tracking-normal select-none hidden sm:block">
            Please wait while we set things up for you
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Loader);