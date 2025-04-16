import React from "react";

const Header: React.FC = () => (
  <header className="w-full bg-white shadow flex items-center justify-between px-8 py-4">
    <div className="text-2xl font-bold text-orange-600">FoodyX</div>
    <nav className="flex gap-8 items-center">
      <a href="#" className="text-gray-700 hover:text-orange-500">Menu</a>
      <a href="#" className="text-gray-700 hover:text-orange-500">My Orders</a>
      <a href="#" className="text-gray-700 hover:text-orange-500">Cart</a>
      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold">Sign In</button>
    </nav>
  </header>
);

export default Header;
