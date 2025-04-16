import React from "react";

const Banner: React.FC = () => (
  <div className="w-full h-64 bg-black flex items-center justify-center relative">
    <img
      src="/images/banner-burger.jpg"
      alt="Delicious Burger"
      className="w-full h-full object-cover opacity-80"
    />
    <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center text-white">
      <div className="text-4xl font-bold mb-2">Delicious BURGER</div>
      <div className="flex gap-8">
        <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold text-lg">2X1 ONLY TODAY!</div>
        <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold text-lg">50% OFF</div>
      </div>
    </div>
  </div>
);

export default Banner;
