import React from "react";
import { motion } from "framer-motion";

// Animation variants for the container and cards
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 18 } },
  hover: { scale: 1.04, boxShadow: "0 8px 32px rgba(255,140,0,0.15)" },
};

const RestaurantInfo: React.FC = () => (
  <motion.div
    className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8"
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
  >
    {/* Delivery Information */}
    <motion.div
      className="bg-orange-50 p-4 rounded shadow"
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="font-bold text-orange-600 mb-2">Delivery Information</div>
      <div>123 London Street, UK</div>
      <div>+44 1234 567890</div>
      <div>10:00 AM - 10:00 PM</div>
    </motion.div>

    {/* Contact Information */}
    <motion.div
      className="bg-orange-50 p-4 rounded shadow"
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="font-bold text-orange-600 mb-2">Contact Information</div>
      <div>If you have changes or delivery issues, please contact us directly.</div>
      <div>+94444343-43</div>
      <a href="https://mcdonalds.uk/" className="text-blue-600 underline">https://mcdonalds.uk/</a>
    </motion.div>

    {/* Operational Times */}
    <motion.div
      className="bg-orange-50 p-4 rounded shadow"
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="font-bold text-orange-600 mb-2">Operational Times</div>
      <div>Monday - Friday: 9:00 AM - 2:00 AM</div>
      <div>Saturday - Sunday: 9:00 AM - 3:00 AM</div>
      <div>Estimated delivery time: ~30 min</div>
    </motion.div>
  </motion.div>
);

export default RestaurantInfo;
