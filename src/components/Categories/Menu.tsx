import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";

// Example menu data
const menu = [
  {
    section: "Big Macs",
    items: [
      { name: "Classic Big Mac", price: "$3.99", img: "/images/fanta.jpg" },
      { name: "Double Big Mac", price: "$5.49", img: "/images/fanta.jpg" },
      { name: "Spicy Big Mac", price: "$4.29", img: "/images/fanta.jpg" },
    ],
  },
  {
    section: "Fries",
    items: [
      { name: "Classic Fries", price: "$1.49", img: "/images/fanta.jpg" },
      { name: "Cheesy Fries", price: "$2.29", img: "/images/fanta.jpg" },
      { name: "Curly Fries", price: "$2.79", img: "/images/fanta.jpg" },
    ],
  },
  {
    section: "Cold Drinks",
    items: [
      { name: "Coke", price: "$1.29", img: "/images/coke.jpg" },
      { name: "Sprite", price: "$1.29", img: "/images/sprite.jpg" },
      { name: "Fanta", price: "$1.29", img: "/images/fanta.jpg" },
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
  <div className="space-y-10">
    {menu.map((section, sectionIdx) => (
      <div key={section.section}>
        <h2 className="text-2xl font-bold mb-4">{section.section}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {section.items.map((item, i) => (
            <motion.div
              key={item.name}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
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
                className="w-40 h-28 object-cover rounded mb-2"
                initial={{ scale: 0.95, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              />
              <div className="font-semibold">{item.name}</div>
              <div className="text-gray-500 mb-2">{item.price}</div>
              <Button>Add to Cart</Button>
            </motion.div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default Menu;
