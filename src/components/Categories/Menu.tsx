import React from "react";

const menuItems = [
  { name: "Big Mac", desc: "Double beef, fresh lettuce", price: "$5.99", img: "/images/big-mac.jpg" },
  { name: "Fries", desc: "Crispy golden fries", price: "$2.99", img: "/images/fries.jpg" },
  { name: "Coke", desc: "Refreshing cola drink", price: "$1.99", img: "/images/coke.jpg" },
];

const Menu: React.FC = () => {
  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {menuItems.map((item, index) => (
          <div key={index} className="bg-white shadow-md p-4 rounded-lg">
            <img src={item.img} alt={item.name} className="w-full h-32 object-cover rounded-md mb-2" />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-500">{item.desc}</p>
            <p className="font-bold">{item.price}</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Add</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
