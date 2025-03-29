import React from "react";

const Banner: React.FC = () => {
  return (
    <section className="relative h-64 bg-cover bg-center flex items-center justify-center text-white sm:h-80 md:h-96 lg:h-112"
      style={{ backgroundImage: `url('/images/mcdonalds-banner.jpg')` }}>
      <div className="bg-black bg-opacity-50 p-6 rounded-lg">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">McDonald's East London</h2>
        <p className="text-lg sm:text-xl">⭐ 3.4/5 Rating</p>
      </div>
    </section>
  );
};

export default Banner;
