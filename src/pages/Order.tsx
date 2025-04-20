import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import XtremePizza from "../assets/images/XtremePizza.jpeg";
import DeluxePizza from "../assets/images/DeluxePizza.jpeg";
import TandooriPizza from "../assets/images/TandooriPizza.jpeg";

const pizzas = [
  {
    id: 1,
    name: "Farm House Xtreme Pizza",
    description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium French Fries, 3 cold drinks",
    spiceLevel: 2,
    image: XtremePizza,
    prices: { small: 1000, medium: 1500, large: 2000, xl: 2500 },
  },
  {
    id: 2,
    name: "Deluxe Pizza",
    description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium French Fries, 3 cold drinks",
    spiceLevel: 3,
    image: DeluxePizza,
    prices: { small: 1100, medium: 1600, large: 2100, xl: 2600 },
  },
  {
    id: 3,
    name: "Tandoori Pizza",
    description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium French Fries, 3 cold drinks",
    spiceLevel: 4,
    image: TandooriPizza,
    prices: { small: 1500, medium: 2000, large: 2500, xl: 3000 },
  },
];

const Order: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});
  const [cart, setCart] = useState<{ id: number; name: string; size: string; price: number }[]>([]);

  const handleSizeSelection = (pizzaId: number, size: string) => {
    setSelectedSizes({ ...selectedSizes, [pizzaId]: size });
  };

  const handleAddToCart = (pizzaId: number) => {
    const selectedSize = selectedSizes[pizzaId];
    if (!selectedSize) return;

    const pizza = pizzas.find((p) => p.id === pizzaId);
    if (!pizza) return;

    const newItem = {
      id: pizza.id,
      name: pizza.name,
      size: selectedSize,
      price: pizza.prices[selectedSize as keyof typeof pizza.prices],
    };

    setCart([...cart, newItem]);

    // Redirect to cart page after adding item
    navigate("/cart");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pizzas</h1>

      {pizzas.map((pizza) => (
        <div key={pizza.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{pizza.name}</h2>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < pizza.spiceLevel ? "text-red-500" : "text-gray-300"}>
                    🌶
                  </span>
                ))}
              </div>
              <p className="text-gray-600">{pizza.description}</p>
            </div>
            <img src={pizza.image} alt={pizza.name} className="w-24 h-24 rounded-full object-cover" />
          </div>

          <div className="flex gap-2 mt-4">
            {Object.entries(pizza.prices).map(([size, price]) => (
              <button
                key={size}
                className={`px-4 py-2 rounded-lg border ${
                  selectedSizes[pizza.id] === size ? "bg-black text-white" : "bg-green-500 text-white"
                }`}
                onClick={() => handleSizeSelection(pizza.id, size)}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)} Rs.{price.toFixed(2)}
              </button>
            ))}
          </div>

          {/* Add to Cart Button */}
          <button
            className={`mt-4 px-6 py-2 rounded-lg w-full ${
              selectedSizes[pizza.id] ? "bg-black text-white" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => handleAddToCart(pizza.id)}
            disabled={!selectedSizes[pizza.id]}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Order;
