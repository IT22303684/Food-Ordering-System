import { FaMoon, FaSun } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

interface HeaderProps {
    toggleDarkMode: () => void;
    darkMode: boolean;
    toggleSidebar: () => void;
  }

const Header = ({ toggleDarkMode, darkMode, toggleSidebar }: HeaderProps) => {
  

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:ring-gray-200 focus:outline-none focus:ring-2 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600  ">
              <HiOutlineMenuAlt2 className="text-2xl" onClick={toggleSidebar}/>
            </button>
            <a href="#" className="flex ms-2 md:me-24">
              <span className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap dark:text-white">
                Admin Name
              </span>
            </a>
          </div>
          <button onClick={toggleDarkMode} className="dark:bg-slate-50 dark:text-slate-700 rounded-full p-2">
            {darkMode ? <FaSun className="" /> : <FaMoon className="text-gray-500" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;