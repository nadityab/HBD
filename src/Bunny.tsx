import React from "react";
import "./Bunny.css";

interface BunnyProps {
  name: string;
}

const Bunny: React.FC<BunnyProps> = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* --- CUTE SPEECH BUBBLE --- */}
      {/* Margin bottom disesuaikan biar nggak terlalu jauh dari kepala */}
      <div className="relative z-20 mb-4 animate-[bounce_3s_infinite]">
        <div className="relative bg-white border-4 border-gray-800 rounded-[2.5rem] px-6 py-3 md:px-10 md:py-5 shadow-[0_8px_0_rgba(0,0,0,0.2)] z-10 text-center min-w-50">
          <span className="text-xl md:text-3xl font-black text-gray-800 tracking-wide">
            Hi... {name}! 👋 <br /> (tap anywhere to continue)
          </span>
        </div>
        {/* Segitiga Bubble */}
        <div className="absolute w-6 h-6 bg-white border-b-4 border-r-4 border-gray-800 -bottom-2.5 left-1/2 -translate-x-1/2 rotate-45 z-0 rounded-br-sm"></div>
      </div>

      {/* --- ANIMATED BUNNY --- */}
      {/* scale-75 untuk mobile biar proporsional (nggak super kecil), origin-top biar nempel ke bubble */}
      <div className="relative scale-75 md:scale-100 z-10 origin-top">
        <article className="bunny-art" role="img" aria-labelledby="alt">
          <h1 id="alt">Animated Cartoon Bunny</h1>
          <div className="body">
            <div className="arm left-arm"></div>
            <div className="arm right-arm"></div>
            <div className="leg left-leg"></div>
            <div className="leg right-leg"></div>
          </div>
          <div className="ear left-ear"></div>
          <div className="ear right-ear"></div>
          <div className="hair-back"></div>
          <div className="head">
            <div className="hair"></div>
            <div className="cheek left-cheek"></div>
            <div className="cheek right-cheek"></div>
            <div className="eye left-eye"></div>
            <div className="eye right-eye"></div>
            <div className="mouth"></div>
            <div className="nose"></div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Bunny;
