import Header from "@/components/restaurants/Header";
import { useState, useEffect } from "react";

const ResturentLayout = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Sync dark mode with document class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="font-sans">
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
    </div>
  );
};

export default ResturentLayout;