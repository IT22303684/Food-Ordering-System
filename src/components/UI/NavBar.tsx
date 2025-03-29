import { useState, useEffect } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className={`text-2xl font-bold ${
                isScrolled ? "text-orange-600" : "text-white"
              }`}
            >
              FoodyX
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`hover:text-orange-600 transition-colors ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div
              className={`px-2 pt-2 pb-3 space-y-1 ${
                isScrolled ? "bg-white/80 backdrop-blur-md" : "bg-black/50"
              }`}
            >
              <Link
                to="/menu"
                className={`block px-3 py-2 hover:text-orange-600 transition-colors ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                Menu
              </Link>
              <Link
                to="/orders"
                className={`block px-3 py-2 hover:text-orange-600 transition-colors ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                My Orders
              </Link>
              <Link
                to="/cart"
                className={`block px-3 py-2 hover:text-orange-600 transition-colors ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                Cart
              </Link>
              <Link
                to="/signin"
                className="block px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
