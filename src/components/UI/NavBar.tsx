import { useState, useEffect } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import MobileNavBar from "./MobileNavBar";
import { useAuth } from "@/context/AuthContext";
import { FiUser, FiLogOut } from "react-icons/fi";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  const { user, isAuthenticated, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    // Redirect to home page after logout
    window.location.href = "/";
  };

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
                {isAuthenticated && user?.role === "CUSTOMER" ? (
                  <>
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
                      to="/orders"
                      className={`hover:text-orange-600 transition-colors ${
                        isScrolled ? "text-gray-700" : "text-white"
                      }`}
                    >
                      My Orders
                    </Link>
                    <div className="relative group">
                      <button
                        className={`${
                          isScrolled ? "text-gray-700" : "text-white"
                        } hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium flex items-center`}
                      >
                        <FiUser className="mr-1" size={20} />
                        {user.email}
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <FiLogOut className="mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-orange-600 text-white hover:bg-orange-700 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
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
