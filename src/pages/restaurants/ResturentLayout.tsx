import { Outlet } from "react-router-dom";
import Header from "@/components/restaurants/Header";
import Sidebar from "@/components/restaurants/Sidebar";
import { useState, useEffect } from "react";

const ResturentLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="font-sans">
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <main className="ml-64 pt-20">
        <Outlet /> {/* This renders Profile, Overview, etc. */}
      </main>
    </div>
  );
};

export default ResturentLayout;