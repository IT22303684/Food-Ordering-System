import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/UI/Button";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";

function HeroSection() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Delay to ensure content animates after loader
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

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
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative max-w-7xl mx-auto px-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Welcome to <span className="text-orange-500">FoodyX</span>
              <br />
              Delicious Food,
              <br />
              Delivered To Your Door
            </motion.h1>
            <motion.p
              className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Choose from hundreds of restaurants and get your favorite meals
              delivered fast and fresh
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Button to="/menu" icon={FaArrowRight}>
                Order Now
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeroSection;
