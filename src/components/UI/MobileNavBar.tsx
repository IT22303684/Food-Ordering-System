import { useState, useEffect } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

function MobileNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Reset menu state when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="md:hidden fixed w-screen top-0 z-50 bg-white shadow-lg">
      <div className=" mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-orange-600">
            FoodyX
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-orange-600 transition-colors"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="bg-white shadow-lg px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/menu"
              className="block px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/orders"
              className="block px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              My Orders
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <div className="flex items-center">
                <ShoppingCartIcon className="h-6 w-6 mr-2" />
                Cart
              </div>
            </Link>
            <Link
              to="/signin"
              className="block px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default MobileNavBar;
