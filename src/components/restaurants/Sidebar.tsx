// Sidebar.tsx
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiBook ,
  FiSettings,
  FiPieChart,
  FiUser,
  FiDivide ,
  FiUsers ,
  FiHome,
  FiSunset,
} from "react-icons/fi";
import { MdPayments } from "react-icons/md";
import { useState } from "react";

interface SubMenuItem {
  path: string;
  title: string;
}

interface MenuItem {
  path: string;
  title: string;
  icon: JSX.Element;
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  { path: "/overview", title: "Overview", icon: <FiPieChart />},
  { path: "/orders", title: "Orders", icon: <FiSunset  />, subItems: [
    { path: "/orders/new", title: "New Orders" },
    { path: "/orders/preparing", title: "Preparing Orders" },
    { path: "/orders/ready", title: "Ready for Pickup" },
    { path: "/orders/completed", title: "Completed Orders" },
    { path: "/orders/canceled", title: "Canceled Orders" },
  ]},
  { path: "/menu-management", title: "Menu Management", icon: <FiBook  />, subItems: [
    { path: "/menu-management/all", title: "All Items" },
    { path: "/menu-management/add", title: "Add New Item" },
    { path: "/menu-management/categories", title: "Categories" },
  ]},
  { path: "/promotions", title: "Promotions & Discounts", icon: <FiDivide  />, subItems: [
    { path: "/promotions/create", title: "Create Promotion" },
    { path: "/promotions/active", title: "Active Promotions" },
  ]},
  { path: "/customers", title: "Customers", icon: <FiUsers  />, subItems: [
    { path: "/customers/feedback", title: "Customer Feedback" },
    { path: "/customers/loyalty", title: "Loyalty Programs" },
  ]},
  { path: "/earnings", title: "Earnings & Payments", icon: <MdPayments />, subItems: [
    { path: "/earnings/daily", title: "Daily/Weekly Earnings" },
    { path: "/earnings/payouts", title: "Payouts" },
  ]},
  { path: "/settings", title: "Business Settings", icon: <FiHome />, subItems: [
    { path: "/settings/profile", title: "Profile & Store Info" },
    { path: "/settings/delivery", title: "Delivery Settings" },
    { path: "/settings/staff", title: "Staff Management" },
  ]},
  { path: "/reports", title: "Reports & Analytics", icon: <FiCalendar />, subItems: [
    { path: "/reports/sales", title: "Sales Reports" },
    { path: "/reports/behavior", title: "Customer Behavior" },
  ]},
  { path: "/support", title: "Help & Support", icon: <FiSettings />, subItems: [
    { path: "/support/contact", title: "Contact Uber Eats Support" },
    { path: "/support/faq", title: "FAQs & Guides" },
  ]},
  { path: "/logout", title: "Logout", icon: <FiUser /> },
];

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar = ({ isSidebarOpen }: SidebarProps) => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (path: string) => {
    setOpenMenus(prev => 
      prev.includes(path) 
        ? prev.filter(item => item !== path)
        : [...prev, path]
    );
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 transition-transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {menuItems.map((item) => (
            <li key={item.path}>
              <div 
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer"
                onClick={() => item.subItems && toggleMenu(item.path)}
              >
                <span className="mr-3 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                  {item.icon}
                </span>
                <span className="flex-1">{item.title}</span>
                {item.subItems && (
                  <svg 
                    className={`w-4 h-4 transition-transform ${openMenus.includes(item.path) ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>
              {item.subItems && openMenus.includes(item.path) && (
                <ul className="pl-6 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.path}>
                      <Link
                        to={subItem.path}
                        className="flex items-center p-2 text-sm text-gray-700 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;