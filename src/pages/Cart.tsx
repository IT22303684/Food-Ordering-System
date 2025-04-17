import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa"; // Delete Icon
import XtremePizza from "../assets/images/XtremePizza.jpeg"; // Background Image

const initialCartItems = [
  { id: 1, name: '12" Vegetarian Pizza', description: "No Mushrooms + Green Peppers", price: 3000, quantity: 1, deleteColor: "gray" },
  { id: 2, name: '17" Tandoori Pizza', description: "No Mushrooms + Green Peppers", price: 2000, quantity: 1, deleteColor: "gray" },
  { id: 3, name: "Coke Coca Cola", description: "", price: 200, quantity: 2, deleteColor: "red" },
  { id: 4, name: '12" Vegetarian Pizza', description: "No Mushrooms + Green Peppers", price: 3000, quantity: 1, deleteColor: "purple" },
];

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleDelete = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total prices
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 100.00;
  const deliveryFee = 250.00;
  const total = subtotal - discount + deliveryFee;

  return (
    <div 
      className="min-h-screen flex justify-center items-center bg-cover bg-center relative p-4"
      style={{
        backgroundImage: `url(${XtremePizza})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-xl"></div>

      {/* Cart Container - Much Wider */}
      <div className="relative bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl w-full max-w-7xl animate-fade-in">
        <h1 className="text-3xl font-bold mb-4 text-green-700 text-center">🛒 My Basket</h1>

        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-white shadow-md p-4 mb-3 rounded-lg transition-all duration-300 hover:shadow-lg">
              <div>
                <p className="text-lg font-semibold">{item.name}</p>
                {item.description && <p className="text-gray-500 text-sm">{item.description}</p>}
                <p className="text-green-600 font-bold text-md">Rs.{item.price.toFixed(2)}</p>
              </div>

              {/* Delete Button with Hover Effect */}
              <button
                onClick={() => handleDelete(item.id)}
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  item.deleteColor === "gray" ? "bg-gray-300 text-black" :
                  item.deleteColor === "red" ? "bg-red-500 text-white hover:bg-red-700" :
                  "bg-purple-500 text-white hover:bg-purple-700"
                }`}
              >
                <FaTrashAlt size={18} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">Your cart is empty 🛒</p>
        )}

        <hr className="my-4 border-gray-300" />

        {/* Price Details */}
        <div className="text-md font-semibold space-y-3">
          <p>Subtotal: <span className="float-right">Rs.{subtotal.toFixed(2)}</span></p>
          <p className="text-red-500">Discounts: <span className="float-right">-Rs.{discount.toFixed(2)}</span></p>
          <p>Delivery Fee: <span className="float-right">Rs.{deliveryFee.toFixed(2)}</span></p>
        </div>

        {/* Total Amount */}
        <div className="bg-orange-500 text-white text-center p-4 rounded-lg mt-5 text-lg font-bold shadow-lg">
          Total to Pay: Rs.{total.toFixed(2)}
        </div>

        {/* Back & Checkout Buttons */}
        <div className="flex justify-between mt-6">
          <button 
            onClick={() => navigate("/orders")} 
            className="px-6 py-3 bg-gray-700 text-white rounded-lg transition-all duration-300 hover:bg-gray-900 shadow-md flex items-center text-md"
          >
            ⬅ Back to Order
          </button>
          <button 
            onClick={() => navigate("/payment-method")} 
            className="px-6 py-3 bg-green-600 text-white rounded-lg transition-all duration-300 hover:bg-green-800 shadow-md text-md"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
