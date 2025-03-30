import { useState, useEffect } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import MobileNavBar from "./MobileNavBar";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  // Add scroll event listener only for desktop
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [isHomePage]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed w-full top-0 z-50 transition-all duration-300">
        <div
          className={`${
            isScrolled || !isHomePage
              ? "bg-white/80 backdrop-blur-md shadow-lg"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link
                to="/"
                className={`text-2xl font-bold ${
                  isScrolled ? "text-orange-600" : "text-white"
                }`}
              >
                FoodyX
              </Link>

              {/* Desktop Navigation Links */}
              <div className="flex items-center space-x-8">
                <Link
                  to="/menu"
                  className={`hover:text-orange-600 transition-colors ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  Menu
                </Link>
                <Link
                  to="/orders"
                  className={`hover:text-orange-600 transition-colors ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  My Orders
                </Link>
                <Link
                  to="/cart"
                  className={`flex items-center hover:text-orange-600 transition-colors ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  <ShoppingCartIcon className="h-6 w-6 mr-1" />
                  Cart
                </Link>
                <Link
                  to="/signin"
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNavBar />
    </>
  );
}

export default NavBar;
