import React from "react";

const Banner: React.FC = () => {
  return (
    <section
      className="relative h-64 sm:h-80 md:h-96 lg:h-[450px] bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url('/images/mcdonalds-banner.jpg')` }}
    >
      <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold">McDonald's East London</h2>
        <p className="text-lg md:text-xl mt-2">⭐ 3.4/5 Rating</p>
      </div>
    </section>
  );
};

export default Banner;