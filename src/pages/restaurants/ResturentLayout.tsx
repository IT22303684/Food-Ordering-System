import Header from "@/components/restaurants/Header";
import Sidebar from "@/components/restaurants/Sidebar";
import { useState, useEffect } from "react";

const ResturentLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggleside bar open function
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

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
      <Header 
        toggleDarkMode={toggleDarkMode} 
        darkMode={darkMode} 
        toggleSidebar={toggleSidebar}
      />
      <Sidebar isSidebarOpen={isSidebarOpen}/>
    </div>
  );
};

export default ResturentLayout;