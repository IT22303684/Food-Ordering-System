import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";

// Example menu data
const menu = [
  {
    section: "Big Macs",
    items: [
      { name: "Classic Big Mac", price: "$3.99", img: "./assets/images/Classic_Big_Mac.jpg" },
      { name: "Double Big Mac", price: "$5.49", img: "./assets/images/Double_Big_Mac.jpg"},
      { name: "Spicy Big Mac", price: "$4.29", img: "./assets/images/Spicy_Big_Mac.jpg" },
      { name: "Spicy Big Mac", price: "$4.29", img: "./assets/images/Spicy_Big_Mac.jpg" },
    ],
  },
  {
    section: "Fries",
    items: [
      { name: "Classic Fries", price: "$1.49", img: "/assets/images/Classic_Fries.jpg" },
      { name: "Cheesy Fries", price: "$2.29", img: "/assets/images/Cheesy_Fries.jpg" },
      { name: "Curly Fries", price: "$2.79", img: "./assets/images/Curly_Fries.jpg" },
      { name: "Curly Fries", price: "$2.79", img: "./assets/images/Curly_Fries.jpg" },
    ],
  },
  {
    section: "Cold Drinks",
    items: [
      { name: "Coke", price: "$1.29", img: "./assets/images/Coke.jpg" },
      { name: "Sprite", price: "$1.29", img: "./assets/images/Sprite.jpg" },
      { name: "Fanta", price: "$1.29", img: "./assets/images/Fanta.jpg" },
      { name: "Fanta", price: "$1.29", img: "./assets/images/Fanta.jpg" },
    ],
  },
  
];

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  }),
  hover: {
    scale: 1.04,
    boxShadow: "0 8px 32px rgba(255,140,0,0.15)",
    transition: { type: "spring", stiffness: 300 },
  },
};

const Menu: React.FC = () => (
  <div className="space-y-10 ">
    {menu.map((section) => (
      <div key={section.section}>
        <h2 className="text-2xl font-bold mb-4">{section.section}</h2>
        <div className="grid grid-cols-1 w-50 h-50 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {section.items.map((item, i) => (
            <motion.div
              key={item.name}
              className="bg-white rounded-lg p-4 flex flex-col items-center shadow-md"
              custom={i}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <motion.img
                src={item.img}
                alt={item.name}
                className="w-60 h-48 object-cover rounded mb-2"
                initial={{ scale: 0.95, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              />
              <div className="font-semibold">{item.name}</div>
              <div className="text-gray-500 mb-2">{item.price}</div>
              <div className="flex flex-row gap-4 ">
              <Button>Add to Cart</Button>
              <Button className="bg-gray-400">View</Button>
              </div>
             
            </motion.div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default Menu;
