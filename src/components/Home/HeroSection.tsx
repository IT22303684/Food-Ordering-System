import { motion } from "framer-motion";
import Button from "@/components/UI/Button";
import { FaArrowRight } from "react-icons/fa";

function HeroSection() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center w-full flex items-center justify-center"
      style={{
        backgroundImage: "url('/Home/hero.webp')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Delicious Food,
          <br />
          Delivered To Your Door
        </motion.h1>
        <motion.p
          className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Choose from hundreds of restaurants and get your favorite meals
          delivered fast and fresh
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button to="/menu" icon={FaArrowRight}>
            Order Now
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroSection;
