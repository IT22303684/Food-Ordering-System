import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white">
      <h1 className="text-xl font-bold">Orders</h1>
      <input
        type="text"
        placeholder="Search for food..."
        className="border rounded-lg px-3 py-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
      />
      <div className="flex items-center space-x-4">
        <span className="material-icons cursor-pointer">person</span>
        <span className="relative cursor-pointer">
          <span className="material-icons">shopping_cart</span>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">1</span>
        </span>
      </div>
    </header>
  );
};

export default Header;
